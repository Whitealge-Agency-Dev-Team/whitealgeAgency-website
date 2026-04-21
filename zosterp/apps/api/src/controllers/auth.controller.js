import createError from "http-errors";
import { User, Token } from "@zosterp/database";
import { sendMail } from "@zosterp/email";
import { randomInt } from "crypto";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.data;
    let userRecord;

    if (req.path.includes("register")) {
      [userRecord] = await User.unscoped().findOrCreate({
        where: { email },
        defaults: req.data,
      });
    } else {
      userRecord = await User.unscoped().findOne({ where: { email } });
      if (!userRecord) throw createError(401, "invalid_credentials");
      if (!(await userRecord.comparePassword(password)))
        throw createError(401, "invalid_credentials");
    }

    const { passwordHash, ...user } = userRecord.get({ plain: true });

    if (userRecord.has_2fa) {
      const code = randomInt(100000).toString().padStart(6, "0");
      const token = jwt.sign({ code, user }, process.env.JWT_2FA_SECRET, {
        expiresIn: "5m",
      });

      const { url } = await sendMail({
        to: userRecord.email,
        subject: "2FA",
        html: `<p>Tu código es: <b>${code}</b></p>`,
      });

      return res.status(200).json({ token, url });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const verif2fa = async (req, _, next) => {
  try {
    const { code, token } = req.data;
    const { code: deCode, user } = jwt.verify(
      token,
      process.env.JWT_2FA_SECRET,
    );

    if (deCode !== code) throw createError(400, "invalid_code");
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw createError(400, "token_empty");

    const { tokenId, language } = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
    );

    const foundToken = await Token.findByPk(tokenId, { plain: true });
    if (!foundToken) throw createError(400, "session_empty");

    req.user = { id: foundToken.userId, language };
    await foundToken.destroy();

    next();
  } catch (error) {
    res.clearCookie("refreshToken");
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    res.clearCookie("refreshToken");

    if (refreshToken) {
      const { tokenId: id } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      );
      await Token.destroy({ where: { id } });
    }

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

export const requestRenewPassword = async (req, res, next) => {
  try {
    const email = req.data;
    const userId = await User.findOne({
      where: { email },
      attributes: ["id"],
      plain: true,
    });

    if (!userId) return res.sendStatus(200);

    const token = jwt.sign({ userId }, process.env.JWT_RENEW_SECRET, {
      expiresIn: "10m",
    });

    const { url } = await sendMail({
      to: email,
      subject: "Recuperación de contraseña",
      html: `<a href="${process.env.RENEW_PASSWORD_URL}?token=${token}">Renovar contraseña</a><p>Este enlace vencerá en 10 minutos.</p>`,
    });

    return res.status(200).json({ url });
  } catch (error) {
    next(error);
  }
};

export const renewPassword = async (req, res, next) => {
  try {
    const { password, token } = req.data;
    const { userId: id } = jwt.verify(token, process.env.JWT_RENEW_SECRET);

    await User.update({ password }, { where: { id } });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
