const {
  loginSchema,
  registerSchema,
  emailField,
  renewPwSchema,
  twoFaSchema,
} = require("../schemas/auth.schema");
const createError = require("http-errors");
const { transporter, getEmailUrl } = require("../email");
const { User, Token } = require("../database/models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const generateTokens = require("../handlers/auth.handler");

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw createError(401, "No token provided");

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      res.clearCookie("refreshToken");
      throw createError(401, error);
    }

    const foundToken = await Token.findByPk(decoded.tokenId, { plain: true });
    if (!foundToken) throw createError(401, "Session not found");
    const { userId, device } = foundToken;

    await foundToken.destroy();

    const accessToken = await generateTokens(userId, res, device);

    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    res.clearCookie("refreshToken");

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      await Token.destroy({ where: { id: decoded.tokenId } });
    } catch (error) {
    } finally {
      return res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const {
      error,
      value: { email, password },
    } = loginSchema.validate(req.body);
    if (error) throw createError(400, error);

    const { parsedResult: device } = req.ua;
    const foundUser = await User.scope(null).findOne({
      where: { email },
      plain: true,
    });

    if (!(await foundUser?.comparePassword(password)))
      throw createError(401, "Invalid credentials");

    if (!foundUser.has_2fa) {
      const accessToken = await generateTokens(foundUser.id, res, device);
      const { passwordHash, ...user } = foundUser;
      return res.status(200).json({ accessToken, user });
    } else {
      const code = crypto.randomInt(0, 1000000).toString().padStart(6, "0");
      const twoFaToken = jwt.sign(
        { code, userId: foundUser.id, device: device },
        process.env.JWT_2FA_SECRET,
        { expiresIn: "5m" },
      );
      const infoMail = await transporter.sendMail({
        to: foundUser.email,
        from: "'Zosterp' <no-reply@zosterp.com>",
        subject: "Verificación de dos pasos",
        html: `<p>Tu código de accceso es:<br/>${code}</p>`,
      });
      const data = { twoFaToken };
      if (process.env.NODE_ENV === "development")
        data.mail = await getEmailUrl(infoMail);
      return res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) throw createError(401, error);

    const { parsedResult: device } = req.ua;

    const newUser = await User.create(value, { returning: true });
    const accessToken = await generateTokens(newUser.id, res, device);

    const { passwordHash, ...user } = newUser;
    return res.status(200).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

const requestNewPassword = async (req, res, next) => {
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
    const infoMail = await transporter.sendMail({
      from: "'Zosterp' <no-reply@zosterp.com>",
      to: foundUser.email,
      subject: "Recuperación de contraseña",
      html: `<p>Renueva tu contrasela haciendo <a href="${renewPwUrl}">click aquí</a><br/>Este enlace perderá validez en 15 minutos.</p>`,
    });

    const data =
      process.env.NODE_ENV === "development"
        ? { mail: await getEmailUrl(infoMail) }
        : {};
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

const renewPassword = async (req, res, next) => {
  try {
    const {
      error,
      value: { token, password: newPassword },
    } = renewPwSchema.validate(req.body);
    if (error) throw createError(401, error);

    const decoded = jwt.verify(token, process.env.JWT_RECOVER_SECRET);

    await User.update(
      { password: newPassword },
      { where: { id: decoded.userId } },
    );

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

const verifyTwoFa = async (req, res, next) => {
  try {
    const {
      error,
      value: { token, code },
    } = twoFaSchema.validate(req.body);
    if (error) throw createError(401, error);

    const decoded = jwt.verify(token, process.env.JWT_2FA_SECRET);
    if (decoded.code != code) throw createError(401, "Invalid code");

    const accessToken = await generateTokens(
      decoded.userId,
      res,
      decoded.device,
    );

    const foundUser = await User.findByPk(decoded.userId, { plain: true });
    const { passwordHash, ...user } = foundUser;

    return res.status(200).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logout,
  refresh,
  login,
  register,
  requestNewPassword,
  renewPassword,
  verifyTwoFa,
};
