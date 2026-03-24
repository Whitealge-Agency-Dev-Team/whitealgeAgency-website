const { loginSchema, registerSchema } = require("../schemas/auth.schema");
const { User, Token } = require("../database/models");
const UAParser = require("ua-parser-js");
const jwt = require("jsonwebtoken");

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const foundToken = await Token.findByPk(decoded.tokenId);

    if (!foundToken?.isValid) {
      if (foundToken) await Token.destroy({ where: { id: foundToken.id } });
      return res.status(401).json({ message: "Expired or invalid session" });
    }

    const accessToken = jwt.sign(
      { userId: foundToken.userId },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    await Token.destroy({ where: { id: decoded.tokenId } });

    res.clearCookie("refreshToken");

    return res.status(200);
  } catch (error) {
    return next(error);
  }
};

const generateTokens = async (userId, userAgent, res) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const uaResult = new UAParser(userAgent).getResult();
  const device = `${uaResult.browser.name} ${uaResult.browser.major} - ${uaResult.os.name}`;

  const token = await Token.create({
    userId,
    device,
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

const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const foundUser = await User.findOne({ where: { email: value.email } });
    if (!(await foundUser?.comparePassword(value.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = await generateTokens(
      foundUser.id,
      req.headers["user-agent"],
      res,
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      error.status = 401;
      return next(error);
    }

    const { password, ...filteredValue } = value;
    const [user, created] = await User.findOrCreate({
      where: filteredValue,
      defaults: value,
    });

    if (!created) return res.status(409).json({ message: "Existing user" });

    const accessToken = await generateTokens(
      user.id,
      req.headers["user-agent"],
      res,
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

module.exports = { login, refresh, register, logout };
