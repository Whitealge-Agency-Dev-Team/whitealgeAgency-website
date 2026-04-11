import jwt from "jsonwebtoken";
import { Token } from "@zosterp/database";

export const generateTokens = async ({
  userId,
  language = "en",
  res,
  device = "Unknown",
}) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const token = await Token.create({
      userId,
      device,
      expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const refreshToken = jwt.sign(
      { tokenId: token.id, language },
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
  } catch (error) {
    throw error;
  }
};
