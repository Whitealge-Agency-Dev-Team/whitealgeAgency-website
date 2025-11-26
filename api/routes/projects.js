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
  Status,
  Client,
} = require("../models/index");

router.use(authToken); //(Endpoints protegidos, mis preciosos)

// PROYECTOS
router.get("/", async (req, res) => {
  try {
    const { name, description, statusId } = req.query;

    // Filtros básicos de la tabla Project
    const whereClause = {};
    if (description) whereClause.description = description; // O usa Op.like para búsqueda parcial
    if (statusId) whereClause.statusId = statusId;

    // Lógica para filtrar por Usuario (Relación N:M)
    // Si quieres que el usuario SOLO vea sus proyectos:
    const userFilter = {
      model: User,
      where: { id: req.user.id }, // req.user.id viene del token
      attributes: ["id", "email"], // Solo traemos datos necesarios
      through: { attributes: [] }, // No traer datos de la tabla intermedia
    };

    // Si el usuario es admin y quieres que vea todo, podrías quitar el 'where' dentro del include.
    // Asumiremos que solo ve SUS proyectos:

    const projects = await Project.findAll({
      where: whereClause,
      include: [
        userFilter, // <-- ESTO SOLUCIONA EL ERROR "no existe columna Project.userId"
        {
          model: Client, // Opcional: ver de qué cliente es
          attributes: ["id", "companyName"],
        },
      ],
    });

    res.json(projects);
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
  // 2. Aquí usamos 'sequelize' que ahora sí está importado
  const t = await sequelize.transaction();

  try {
    const { description, estimatedFinish, statusId, clientId } = req.body;

    const finalStatusId =
      statusId === "" || statusId === undefined ? null : parseInt(statusId);

    const newProject = await Project.create(
      {
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
