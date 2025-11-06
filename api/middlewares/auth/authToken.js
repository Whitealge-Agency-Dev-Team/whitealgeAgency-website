require("dotenv").config();
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({
      message: "Credenciales no válidas",
      status: 401,
    });
  }
    
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Cambié JWY_SECRET por JWT_SECRET
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error al verificar el token: " + err.message);
    return res.status(403).json({ message: "Token inválido" });
  }
};

module.exports = { authToken };