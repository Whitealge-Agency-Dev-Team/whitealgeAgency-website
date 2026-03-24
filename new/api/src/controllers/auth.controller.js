const { loginSchema, registerSchema } = require("../schemas/auth.schema");
const createError = require("http-errors");
const { User, Token } = require("../database/models");
const UAParser = require("ua-parser-js");
const jwt = require("jsonwebtoken");

const generateTokens = async (userId, userAgent = null, res) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  if (!userAgent) {
    const uaResult = new UAParser(userAgent).getResult();
    userAgent = `${uaResult.browser.name} ${uaResult.browser.major} - ${uaResult.os.name}`;
  }

  const token = await Token.create({
    userId,
    userAgent,
    expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const refreshToken = jwt.sign(
    { tokenId: token.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return accessToken;
};

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

    const accessToken = await generateTokens(userId, device, res);

    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw createError(401, "No token provided");

    res.clearCookie("refreshToken");
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      await Token.destroy({ where: { id: decoded.tokenId } });
    } catch (error) {
      throw createError(401, error);
    }

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) throw createError(400, error);

    const foundUser = await User.findOne({ where: { email: value.email } });

    if (!(await foundUser?.comparePassword(value.password)))
      throw createError(401, "Invalid credentials");

    const accessToken = await generateTokens(
      foundUser.id,
      req.headers["user-agent"],
      res,
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) throw createError(401, error);

    const { password, ...filteredValue } = value;
    const [user, created] = await User.findOrCreate({
      where: filteredValue,
      defaults: value,
    });

    if (!created) throw createError(409, "Existing user");

    const accessToken = await generateTokens(
      user.id,
      req.headers["user-agent"],
      res,
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, refresh, register, logout };
