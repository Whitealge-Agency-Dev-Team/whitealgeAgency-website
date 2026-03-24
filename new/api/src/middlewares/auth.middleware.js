require("dotenv-safe").config();
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const authToken = async (req, _res, next) => {
  try {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if (!token) throw createError(401, "No token provided");

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      throw createError(401, error)
    }

    req.user = { id: decoded.userId };
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = authToken;
