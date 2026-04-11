import createError from "http-errors";
import { User, Token } from "@zosterp/database";
import {
  registerSchema,
  loginSchema,
  twoFaSchema,
  emailField,
  renewPwSchema,
} from "@zosterp/schemas";
import { generateTokens } from "../handlers/index.js";
import { sendMail } from "@zosterp/email";
import { randomInt } from "crypto";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    req.body.language = req.language;
    const { error, value } = registerSchema.validate(req.body);
    if (error) throw createError(400, error);

    const newUser = await User.create(value);
    const { passwordHash, ...user } = newUser.dataValues;
    const { device } = req.ua;
    const accessToken = await generateTokens({
      userId: user.id,
      res,
      device,
      language: user.language,
    });

    return res.status(200).json({ user, accessToken });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const {
      error,
      value: { email, password },
    } = loginSchema.validate(req.body);
    if (error) throw createError(400, error);

    const foundUser = await User.unscoped().findOne({ where: { email } });

    if (!(await foundUser?.comparePassword(password)))
      throw createError(400, "INVALID_CREDENTIALS");

    const { device } = req.ua;
    if (!foundUser.has_2fa) {
      const { passwordHash, ...user } = foundUser.dataValues;
      const accessToken = await generateTokens({
        userId: user.id,
        res,
        device,
        language: user.language,
      });
      return res.status(200).json({ accessToken, user });
    } else {
      const code = randomInt(0, 1000000).toString().padStart(6, "0");
      const twoFaToken = jwt.sign(
        { code, userId: foundUser.id, language: foundUser.language, device },
        process.env.JWT_2FA_SECRET,
        { expiresIn: "5m" },
      );
      const { url } = await sendMail({
        to: foundUser.email,
        subject: "Verificación 2FA",
        html: `<p>Tu código de accceso es:</p><p><b>${code}<b></p>`,
      });
      return res.status(200).json({ twoFaToken, url });
    }
  } catch (error) {
    return next(error);
  }
};

export const verifyTwoFa = async (req, res, next) => {
  try {
    const {
      error,
      value: { token, code },
    } = twoFaSchema.validate(req.body);
    if (error) throw createError(401, error);

    const {
      userId,
      device,
      code: decCode,
      language,
    } = jwt.verify(token, process.env.JWT_2FA_SECRET);
    if (decCode !== code) throw createError(401, "CODE_INVALID");

    const accessToken = await generateTokens({ userId, device, res, language });

    const foundUser = await User.findByPk(userId, { plain: true });
    const { passwordHash, ...user } = foundUser.dataValues;

    return res.status(200).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw createError(401, "TOKEN_EMPTY");

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      res.clearCookie("refreshToken");
      throw createError(401, error);
    }

    const foundToken = await Token.findByPk(decoded.tokenId, { plain: true });
    if (!foundToken) throw createError(401, "SESSION_EMPTY");

    const { userId, device } = foundToken;
    await foundToken.destroy();

    const accessToken = await generateTokens({ userId, res, device });
    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    res.clearCookie("refreshToken");
    try {
      const { tokenId } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      );
      await Token.destroy({ where: { id: tokenId } });
    } catch (error) {}
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

export const requestNewPassword = async (req, res, next) => {
  try {
    const { error, value: email } = emailField.validate(req.body);
    if (error) throw createError(401, error);

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) return res.sendStatus(200);

    const recoverToken = jwt.sign(
      { userId: foundUser.id },
      process.env.JWT_RECOVER_SECRET,
      { expiresIn: "15m" },
    );

    const renewPwUrl = `${process.env.API_ORIGIN}/auth/recover-password?token=${recoverToken}`;
    const { url } = await sendMail({
      to: foundUser.email,
      subject: "Recuperación de contraseña",
      html: `<p>Renueva tu contrasela haciendo <a href="${renewPwUrl}">click aquí</a><br/>Este enlace perderá validez en 15 minutos.</p>`,
    });
    return res.status(200).json({ url });
  } catch (error) {
    return next(error);
  }
};

export const renewPassword = async (req, res, next) => {
  try {
    const {
      error,
      value: { token, password: newPassword },
    } = renewPwSchema.validate(req.body);
    if (error) throw createError(401, error);

    const { userId: id } = jwt.verify(token, process.env.JWT_RECOVER_SECRET);

    await User.update({ password: newPassword }, { where: { id } });

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};
