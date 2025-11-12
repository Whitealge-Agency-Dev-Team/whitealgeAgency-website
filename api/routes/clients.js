const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/auth/authToken");
const { authRole } = require("../middlewares/authorization/authRole");
const { endpointCreate, endpointSearch, endpointUpdate, endpointDelete } = require("../controllers/handlers/endpointHandler");
const { Client, Representative, Engage, Project, Status } = require("../models/index");

// Formulario público para captación de clientes
router.post("/public-form", endpointCreate({
  model: Client,
  columnNames: ["companyName", "contactEmail", "phone", "problemDescription", "industry"]
}));

// Endpoints protegidos
router.use(authToken);

// CLIENTES
router.get("/", authRole("clients", "read"), endpointSearch({
  model: Client,
  filters: [
    { field: "companyName", type: "string" },
    { field: "contactEmail", type: "string" },
    { field: "statusId", type: "int" },
    { field: "industry", type: "string" }
  ]
}));

router.get("/:id", authRole("clients", "read"), async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, {
      include: ['Representatives', 'Engages', 'Projects', 'Status']
    });
    res.json({ client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener cliente" });
  }
});

router.put("/:id", authRole("clients", "update"), endpointUpdate({
  model: Client,
  columnNames: ["companyName", "contactEmail", "phone", "problemDescription", "industry", "statusId"]
}));

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
router.get("/:id/representatives", authRole("clients", "read"), endpointSearch({
  model: Representative,
  filters: [
    { field: "clientId", type: "int" },
    { field: "name", type: "string" },
    { field: "email", type: "string" }
  ]
}));

router.post("/:id/representatives", authRole("clients", "create"), endpointCreate({
  model: Representative,
  columnNames: ["clientId", "name", "email", "phone", "position"]
}));

// RUBROS
router.get("/engages", authRole("clients", "read"), endpointSearch({
  model: Engage,
  filters: [
    { field: "name", type: "string" },
    { field: "description", type: "string" }
  ]
}));

// PROYECTOS DEL CLIENTE
router.get("/:id/projects", authRole("clients", "read"), async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, {
      include: [{
        model: Project,
        through: { attributes: [] }
      }]
    });
    res.json({ projects: client?.Projects || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proyectos" });
  }
});

module.exports = router;