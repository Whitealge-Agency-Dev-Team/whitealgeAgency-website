require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

const authToken = async (req, _res, next) => {
  try {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if (!token) {
      const error = new Error("No token provided");
      error.status = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = { id: decoded.userId };
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authToken;
