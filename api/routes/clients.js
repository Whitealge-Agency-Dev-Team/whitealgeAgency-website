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
const { Client, Representative, Engage, Project } = require("../models/index");

// Formulario público para captación de clientes
router.post(
  "/public-form",
  endpointCreate({
    model: Client,
    columnNames: [
      "companyName",
      "contactEmail",
      "phone",
      "problemDescription",
      "industry",
    ],
  })
);

// Endpoints protegidos
router.use(authToken);

// CLIENTES
router.get("/", async (req, res) => {
  try {
    const user = req.user;
    const data = await Client.findAll({
      where: {
        userId: user.id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(`error: ${error}`);
  }
});

router.get("/:id", authRole("clients", "read"), async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, {
      include: ["Representatives", "Engages", "Projects", "Status"],
    });
    res.json({ client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener cliente" });
  }
});
router.post("/", async (req, res) => {
  try {
    const {
      companyName,
      contactEmail,
      phone,
      problemDescription,
      employeeCount,
      cuit,
      industry,
      statusId,
    } = req.body;
    const user = req.user;
    const finalStatusId =
      statusId === "" || statusId === undefined ? null : parseInt(statusId);

    const newClient = await Client.create({
      companyName,
      contactEmail,
      phone,
      problemDescription,
      employeeCount,
      cuit,
      industry,
      statusId: finalStatusId,
      userId: user.id,
    });

    return res
      .status(201)
      .json({ message: "Cliente creado exitosamente", id: newClient.id });
  } catch (error) {
    console.error("Error creating client:", error);
    // Devuelve el mensaje real del error si estás en desarrollo para debuguear más fácil
    res
      .status(500)
      .json({ message: "Error al añadir el registro", error: error.message });
  }
});

router.put(
  "/:id",
  authRole("clients", "update"),
  endpointUpdate({
    model: Client,
    columnNames: [
      "companyName",
      "contactEmail",
      "phone",
      "problemDescription",
      "industry",
      "statusId",
    ],
  })
);

// Aceptar/rechazar problemática
router.put("/:id/status", authRole("clients", "update"), async (req, res) => {
  try {
    const { statusId } = req.body;
    await Client.update({ statusId }, { where: { id: req.params.id } });

    res.json({ message: "Estado del cliente actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar estado" });
  }
});

// REPRESENTANTES
router.get(
  "/:id/representatives",
  authRole("clients", "read"),
  endpointSearch({
    model: Representative,
    filters: [
      { field: "clientId", type: "int" },
      { field: "name", type: "string" },
      { field: "email", type: "string" },
    ],
  })
);

router.post(
  "/:id/representatives",
  authRole("clients", "create"),
  endpointCreate({
    model: Representative,
    columnNames: ["clientId", "name", "email", "phone", "position"],
  })
);

// RUBROS
router.get(
  "/engages",
  authRole("clients", "read"),
  endpointSearch({
    model: Engage,
    filters: [
      { field: "name", type: "string" },
      { field: "description", type: "string" },
    ],
  })
);

// PROYECTOS DEL CLIENTE
router.get("/:id/projects", authRole("clients", "read"), async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, {
      include: [
        {
          model: Project,
          through: { attributes: [] },
        },
      ],
    });
    res.json({ projects: client?.Projects || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proyectos" });
  }
});

module.exports = router;
