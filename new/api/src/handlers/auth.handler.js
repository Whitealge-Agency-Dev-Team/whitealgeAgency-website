require("dotenv-safe");
const { Token } = require("../database/models");
const jwt = require("jsonwebtoken");

const generateTokens = async (userId, res, device = "Unknown") => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

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

module.exports = generateTokens