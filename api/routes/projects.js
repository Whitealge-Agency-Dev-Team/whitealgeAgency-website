const sequelize = require("../config/database");
const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/auth/authToken");
const { authRole } = require("../middlewares/authorization/authRole");
const {
  endpointCreate,
  endpointSearch,
  endpointUpdate,
  endpointDelete,
} = require("../controllers/handlers/endpointHandler");
const {
  Project,
  Objective,
  KeyDate,
  User,
} = require("../models/index");

router.use(authToken); //(Endpoints protegidos, mis preciosos)

// PROYECTOS
router.get("/", async (req, res) => {
  try {
    let u = await User.findByPk(req.user.id);
    let projects = await u.getProjects();
    
    res.status(200).json({ projects: projects, userRole: req.user.roleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proyectos" });
  }
});

router.get("/:id", authRole("projects", "read"), async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: ["Objectives", "KeyDates", "Users", "Status"],
    });
    res.json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proyecto" });
  }
});

router.post("/", async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { title, description, estimatedFinish, statusId, clientId } = req.body;

    const finalStatusId =
      statusId === "" || statusId === undefined ? null : parseInt(statusId);

    const newProject = await Project.create(
      {
        title,
        description,
        estimatedFinish,
        statusId: finalStatusId,
      },
      { transaction: t }
    );

    // Asociación N:M con el usuario creador
    if (req.user && req.user.id) {
      await newProject.addUser(req.user.id, { transaction: t });
    }

    // Asociación con Cliente (Opcional)
    if (clientId) {
      const clientInt = parseInt(clientId);
      if (!isNaN(clientInt)) {
        await newProject.addClient(clientInt, { transaction: t });
      }
    }

    await t.commit();

    return res.status(201).json({
      message: "Proyecto creado exitosamente",
      data: newProject,
    });
  } catch (error) {
    await t.rollback(); // Rollback seguro

    console.error("Error creating project:", error);

    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((e) => e.message);
      return res
        .status(400)
        .json({ message: "Error de validación", errors: messages });
    }

    res.status(500).json({
      message: "Error al crear el proyecto",
      error: error.message,
    });
  }
});

router.put(
  "/:id",
  authRole("projects", "update"),
  endpointUpdate({
    model: Project,
    columnNames: [
      "name",
      "description",
      "statusId",
      "startDate",
      "endDate",
      "budget",
    ],
  })
);

router.delete(
  "/:id",
  authRole("projects", "delete"),
  endpointDelete({ model: Project })
);

// EQUIPO DEL PROYECTO
router.get("/:id/team", authRole("projects", "read"), async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          through: { attributes: [] },
          attributes: { exclude: ["passwordHash"] },
        },
      ],
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
router.get(
  "/:id/objectives",
  authRole("objectives", "read"),
  endpointSearch({
    model: Objective,
    filters: [
      { field: "projectId", type: "int" },
      { field: "description", type: "string" },
      { field: "isCompleted", type: "boolean" },
    ],
  })
);

router.post(
  "/:id/objectives",
  authRole("objectives", "create"),
  endpointCreate({
    model: Objective,
    columnNames: [
      "projectId",
      "description",
      "dueDate",
      "isCompleted",
      "priority",
    ],
  })
);

// Entrevistas/reuniones
router.get(
  "/:id/key-dates",
  authRole("key_dates", "read"),
  endpointSearch({
    model: KeyDate,
    filters: [
      { field: "projectId", type: "int" },
      { field: "date", type: "date" },
      { field: "title", type: "string" },
    ],
  })
);

router.post(
  "/:id/key-dates",
  authRole("key_dates", "create"),
  endpointCreate({
    model: KeyDate,
    columnNames: ["projectId", "title", "date", "description"],
  })
);

module.exports = router;
