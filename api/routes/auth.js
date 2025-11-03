const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Role, Client } = require("../models/index");
// const { validateUser } = require("../middlewares/validation/validateUser");
const { authToken } = require("../middlewares/auth/authToken");

// Login (se puede remover, ya que había otro en funcionamiento)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role }]
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.Role.name || user.Role.code,
        roleId: user.roleId 
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        role: user.Role.name || user.Role.code
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Registrar trabajador (solo admin/team_manager)
router.post("/register-worker", async (req, res) => {
  try {
    const { email, phoneNumber, name, surname, password, roleId } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await User.create({
      email,
      phoneNumber,
      name,
      surname,
      passwordHash: hashedPassword,
      roleId,
      isActive: true
    });

    res.status(201).json({ 
      message: "Trabajador creado exitosamente",
      userId: user.id 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear trabajador" });
  }
});

// Registrar cliente (una vez aceptada problemática)
router.post("/register-client", authToken, async (req, res) => {
  try {
    const { email, name, surname, clientId } = req.body;
    
    const clientRole = await Role.findOne({ where: { code: 'C' } }); // C de cliente
    const tempPassword = Math.random().toString(36).slice(-8);
    
    const hashedPassword = await bcrypt.hash(tempPassword, 12);
    
    const user = await User.create({
      email,
      name,
      surname,
      passwordHash: hashedPassword,
      roleId: clientRole.id,
      isActive: true
    });

    // mail con las credenciales
    console.log(`Credenciales para ${email}: ${tempPassword}`);

    res.status(201).json({ 
      message: "Cliente registrado exitosamente",
      userId: user.id,
      tempPassword // Solo para dev, en main no enviar
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar cliente" });
  }
});

// Perfil del usuario
router.get("/me", authToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['passwordHash'] },
      include: [{ model: Role }]
    });
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    res.json({user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
});
// Actualizar perfil propio
router.put("/upload_me", authToken, async (req, res) => {
  try {
    const { name, surname, phoneNumber, email } = req.body;
    const allowedFields = { name, surname, phoneNumber, email };
    
    Object.keys(allowedFields).forEach(key => {
      if (allowedFields[key] === undefined) {
        delete allowedFields[key];
      }
    });
    
    await User.update(allowedFields, { where: { id: req.user.id } });
    
    res.json({ message: "Perfil actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
});

module.exports = router;
