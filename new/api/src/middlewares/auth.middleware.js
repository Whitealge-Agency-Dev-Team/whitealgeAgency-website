const UAParser = require("ua-parser-js");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const isAuth = async (req, _, next) => {
  try {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if (!token) throw createError(401, "No token provided");

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      throw createError(401, error);
    }

    req.user = { id: decoded.userId };
    return next();
  } catch (error) {
    next(error);
  }
};

const getDevice = async (req, _, next) => {
  try {
    const uaResult = new UAParser(req.headers["user-agent"]).getResult();
    const parsedResult = uaResult
      ? `${uaResult?.browser?.name} ${uaResult?.browser?.major} - ${uaResult?.os?.name}`
      : "Unkwon";

    req.ua = { parsedResult, result: uaResult };
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isAuth, getDevice };
