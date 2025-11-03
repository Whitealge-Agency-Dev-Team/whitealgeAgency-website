const express = require("express");
const router = express.Router();
// const { authToken } = require("../middlewares/auth/authToken");
const { authRole } = require("../middlewares/authorization/authRole");
const { endpointCreate, endpointSearch, endpointUpdate, endpointDelete } = require("../controllers/handlers/endpointHandler");
const { Project, Objective, KeyDate, User, Status } = require("../models/index");

// router.use(authToken); //(Endpoints protegidos, mis preciosos)

// PROYECTOS
router.get("/", authRole("projects", "read"), endpointSearch({
  model: Project,
  filters: [
    { field: "name", type: "string" },
    { field: "description", type: "string" },
    { field: "statusId", type: "int" }
  ]
}));

router.get("/:id", authRole("projects", "read"), async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: ['Objectives', 'KeyDates', 'Users', 'Status']
    });
    res.json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proyecto" });
  }
});

router.post("/", authRole("projects", "create"), endpointCreate({
  model: Project,
  columnNames: ["name", "description", "statusId", "startDate", "endDate", "budget"]
}));

router.put("/:id", authRole("projects", "update"), endpointUpdate({
  model: Project,
  columnNames: ["name", "description", "statusId", "startDate", "endDate", "budget"]
}));

router.delete("/:id", authRole("projects", "delete"), endpointDelete({ model: Project }));

// EQUIPO DEL PROYECTO
router.get("/:id/team", authRole("projects", "read"), async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [{
        model: User,
        through: { attributes: [] },
        attributes: { exclude: ['passwordHash'] }
      }]
    });
    res.json({ team: project?.Users || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener equipo" });
  }
});

router.post("/:id/team", authRole("projects", "update"), async (req, res) => {
  try {
    const { userIds } = req.body;
    const project = await Project.findByPk(req.params.id);
    await project.setUsers(userIds);
    res.json({ message: "Equipo actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar equipo" });
  }
});

// OBJETIVOS
router.get("/:id/objectives", authRole("objectives", "read"), endpointSearch({
  model: Objective,
  filters: [
    { field: "projectId", type: "int" },
    { field: "description", type: "string" },
    { field: "isCompleted", type: "boolean" }
  ]
}));

router.post("/:id/objectives", authRole("objectives", "create"), endpointCreate({
  model: Objective,
  columnNames: ["projectId", "description", "dueDate", "isCompleted", "priority"]
}));

// Entrevistas/reuniones
router.get("/:id/key-dates", authRole("key_dates", "read"), endpointSearch({
  model: KeyDate,
  filters: [
    { field: "projectId", type: "int" },
    { field: "date", type: "date" },
    { field: "title", type: "string" }
  ]
}));

router.post("/:id/key-dates", authRole("key_dates", "create"), endpointCreate({
  model: KeyDate,
  columnNames: ["projectId", "title", "date", "description"]
}));

module.exports = router;