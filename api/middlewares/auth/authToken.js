require("dotenv").config();
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const tokenCoded = req.headers["authorization"];

  if (!tokenCoded)
    res.json({
      message: "Credenciales no válidas",
      status: 401,
    });
  try {
    const response = jwt.verify(verifyToken, process.env.JWY_SECRET);
    req.user = response;
    next();
  } catch (err) {
    console.error("Error al verificar el token: " + err.message);
  }
};

module.exports = { authToken };
