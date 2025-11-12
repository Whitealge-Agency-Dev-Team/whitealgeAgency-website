require("dotenv").config();
const jwt = require("jsonwebtoken");

const { Role } = require("../../models");

const authToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: "Credenciales no válidas" });
  }
    
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Enriquecer con código de rol si no viene en el token
    if (!decoded.role && decoded.roleId) {
      try {
        const roleInstance = await Role.findByPk(decoded.roleId);
        if (roleInstance) decoded.role = roleInstance.code?.toLowerCase?.() || roleInstance.code;
      } catch (e) {
        // No bloquear si falla lookup de rol; continuar con roleId
      }
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error al verificar el token: " + err.message);
    return res.status(403).json({ message: "Token inválido" });
  }
};

module.exports = { authToken };