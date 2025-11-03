const express = require("express");
const router = express.Router();
// const { authToken } = require("../middlewares/auth/authToken");
const { authRole } = require("../middlewares/authorization/authRole");
const { endpointCreate, endpointSearch, endpointUpdate, endpointDelete } = require("../controllers/handlers/endpointHandler");
const { User, Salary, UserDimiss, Project, Role } = require("../models/index");
const bcrypt = require("bcrypt");

// router.use(authToken);

// /users - Listar usuarios
router.get("/", endpointSearch({
  model: User,
  filters: [
    { field: "name", type: "string" },
    { field: "surname", type: "string" },
    { field: "email", type: "string" },
    { field: "roleId", type: "int" },
    { field: "isActive", type: "boolean" }
  ]
}));

// /users/:id - Obtener usuario específico
router.get("/:id", authRole("users", "read"), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['passwordHash'] },
      include: [{ model: Role }, { model: Project }]
    });
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

// POST /users - Crear usuario
router.post("/", authRole("users", "create"), async (req, res) => {
  try {
    const { email, phoneNumber, name, surname, password, roleId, isActive = true } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await User.create({
      email,
      phoneNumber,
      name,
      surname,
      passwordHash: hashedPassword,
      roleId,
      isActive
    });

    res.status(201).json({
      success: true,
      data: {
        message: "Usuario creado con éxito.",
        record: { id: user.id, email: user.email, name: user.name, surname: user.surname }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
});

// /users/:id - Actualizar usuario
router.put("/:id", authRole("users", "update"), endpointUpdate({
  model: User,
  columnNames: ["email", "phoneNumber", "name", "surname", "roleId", "isActive"]
}));

// /users/:id - Eliminar usuario (borrado lógico)
router.delete("/:id", authRole("users", "delete"), endpointDelete({ model: User }));

// /users/:id/status - Cambiar estado activo/inactivo
router.put("/:id/status", authRole("users", "update"), async (req, res) => {
  try {
    const { isActive } = req.body;
    await User.update({ isActive }, { where: { id: req.params.id } });
    
    res.json({ message: `Usuario ${isActive ? 'activado' : 'desactivado'} exitosamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cambiar estado" });
  }
});

// /users/:id/projects - Proyectos del usuario
router.get("/:id/projects", authRole("users", "read"), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Project,
        through: { attributes: [] }
      }]
    });
    
    res.json({ projects: user?.Projects || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proyectos" });
  }
});

// /users/:id/projects - Asignar proyectos a usuario
router.put("/:id/projects", authRole("users", "update"), async (req, res) => {
  try {
    const { projectIds } = req.body;
    const user = await User.findByPk(req.params.id);
    
    await user.setProjects(projectIds);
    
    res.json({ message: "Proyectos asignados exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al asignar proyectos" });
  }
});

// SALARIOS
router.get("/:id/salaries", authRole("salaries", "read"), endpointSearch({
  model: Salary,
  filters: [
    { field: "userId", type: "int" },
    { field: "amount", type: "decimal" }
  ]
}));

router.post("/:id/salaries", authRole("salaries", "create"), endpointCreate({
  model: Salary,
  columnNames: ["userId", "amount", "description"]
}));

// USER DISMISS
router.get("/:id/user-dimiss", authRole("user_dismiss", "read"), endpointSearch({
  model: UserDimiss,
  filters: [
    { field: "userId", type: "int" },
    { field: "dimissReason", type: "string" }
  ]
}));

router.post("/:id/user-dimiss", authRole("user_dismiss", "create"), endpointCreate({
  model: UserDimiss,
  columnNames: ["userId", "dimissReason"]
}));

module.exports = router;
