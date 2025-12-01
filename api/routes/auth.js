const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Role, Client } = require("../models/index");
// const { validateUser } = require("../middlewares/validation/validateUser");
const { authToken } = require("../middlewares/auth/authToken");
const { authRole } = require("../middlewares/authorization/authRole");
const { createTransporter } = require("../config/email");
const nodemailer = require("nodemailer");

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
        roleId: user.roleId,
        role: user.Role ? user.Role.code : undefined
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
        role_id: user.roleId,
        role: user.Role ? user.Role.code : undefined
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Invitación a trabajador (admin/owner/organizer)
router.post("/invite-worker", authToken, async (req, res) => {
  try {
    const { email, phoneNumber = '', name = '', surname = '', roleCode = 'W' } = req.body;
    
    const role = await Role.findOne({ where: { code: roleCode.toUpperCase() } });
    if (!role) return res.status(400).json({ message: "Código de rol inválido" });

    // Generar token de set-password y contraseña temporal aleatoria
    const tempPassword = Math.random().toString(36).slice(-10);
    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    const user = await User.create({
      email,
      phoneNumber,
      name,
      surname,
      passwordHash: hashedPassword,
      roleId: role.id,
      isActive: true
    });

    const setPassToken = jwt.sign({ type: 'set_password', id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const FRONT_URL = process.env.FRONT_URL || 'http://localhost:5173';
    const link = `${FRONT_URL}/crm/set-password?token=${setPassToken}`;

    const transporter = await createTransporter()

    const mail = await transporter.sendMail({
      to: email,
      subject: "Inivtación a proyecto",
      html: `<p>Estás invitado al CRM. Establece tu contraseña aquí: <a href="${link}" target="_blank">click aquí</a></p>`
    })
    console.log(`[INVITE] Enviar a ${email}: Estás invitado al CRM. Establece tu contraseña aquí: ${link}`);

    res.status(201).json({ message: "Invitación enviada (consola)", userId: user.id, url: nodemailer.getTestMessageUrl(mail) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al invitar trabajador" });
  }
});

// Registrar cliente (una vez aceptada problemática)
router.post("/register-client", authToken, async (req, res) => {
  try {
    const { email, name, surname, clientId } = req.body;

    const clientRole = await Role.findOne({ where: { code: 'C' } }); // C de cliente
    const tempPassword = Math.random().toString(36).slice(-10);

    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    const user = await User.create({
      email,
      name,
      surname,
      passwordHash: hashedPassword,
      roleId: clientRole.id,
      isActive: true
    });

    // Enviar link de set-password (consola)
    const setPassToken = jwt.sign({ type: 'set_password', id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const FRONT_URL = process.env.FRONT_URL || 'http://localhost:5173';
    const link = `${FRONT_URL}/crm/set-password?token=${setPassToken}`;
    console.log(`[INVITE] Cliente aceptado ${email}. Establece tu contraseña aquí: ${link}`);

    res.status(201).json({
      message: "Cliente registrado exitosamente (invitación en consola)",
      userId: user.id
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

    res.json({ user });
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

// Establecer contraseña con token de invitación
router.post("/set-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: "Token y nueva contraseña son requeridos" });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    if (payload.type !== 'set_password' || !payload.id) {
      return res.status(400).json({ message: "Token inválido" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.update({ passwordHash: hashedPassword }, { where: { id: payload.id } });

    return res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al establecer la contraseña" });
  }
});

// Cambiar contraseña (usuario autenticado)
router.post('/change-password', authToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ message: 'La contraseña actual y la nueva son obligatorias' });
    if (String(newPassword).length < 8) return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 8 caracteres' });

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Contraseña actual incorrecta' });

    const hashed = await bcrypt.hash(newPassword, 12);
    await User.update({ passwordHash: hashed }, { where: { id: user.id } });

    return res.json({ message: 'Contraseña actualizada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al cambiar la contraseña' });
  }
});


router.post("/sendConsult", async (req, res) => {
  try {
    const { nombreEmpresa, emailEmpresa, telefonoEmpresa, industriaEmpresa, descEmpresa } = req.body;

    const transporter = await createTransporter();

    const mail = await transporter.sendMail({
      to: "federicocoronado2006@gmail.com",
      subject: "Solicitud de servicios (nuevo cliente)",
      html: `
      <h1>
        ¿Quiere aceptar a un nuevo cliente?
      </h1>
      <p>Nombre: ${nombreEmpresa}</p>      
      <p>Contacto:</p>      
      <p>Email: ${emailEmpresa} </p>      
      <p>Telefono: ${telefonoEmpresa} </p>      
      <p>Sector industrial: ${industriaEmpresa}</p>      
      <p>Problemática que enfrenta "${nombreEmpresa}": ${descEmpresa}</p>      
      <a href="http://localhost:5173/">SI</a> 
      <a href="http://localhost:5173/">NO</a>
      `
    })
    res.json({ message: "Sent ;:)", status: 200, ulr: nodemailer.getTestMessageUrl(mail)});
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
