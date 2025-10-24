const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/auth/authToken");
const { authRole } = require("../middlewares/authorization/authRole");
const { Project, Client, User, Interview } = require("../models/index");

router.use(authToken); /*(Endpoints protegidos)*/

// Estadísticas generales
router.get("/stats", authRole("Dashboard", "read"), async (req, res) => {
  try {
    const activeProjects = await Project.count({ where: { statusId: ACTIVE_STATUS } });
    const totalClients = await Client.count();
    const activeWorkers = await User.count({ where: { isActive: true } });
    const pendingInterviews = await Interview.count({ 
      where: { statusId: PENDING_STATUS } 
    });

    res.json({
      activeProjects,
      totalClients,
      activeWorkers,
      pendingInterviews
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener estadísticas" });
  }
});

// Proyectos activos
router.get("/active-projects", authRole("Dashboard", "read"), async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { statusId: ACTIVE_STATUS },
      include: ['Users', 'Status'],
      limit: 10
    });
    res.json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proyectos activos" });
  }
});

// Clientes pendientes
router.get("/pending-clients", authRole("Dashboard", "read"), async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: { statusId: PENDING_STATUS },
      include: ['Status'],
      limit: 10
    });
    res.json({ clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener clientes pendientes" });
  }
});

// Próximas entrevistas
router.get("/upcoming-interviews", authRole("Dashboard", "read"), async (req, res) => {
  try {
    const interviews = await Interview.findAll({
      where: {
        scheduledDate: {
          [Op.gte]: new Date()
        }
      },
      include: ['Representative', 'Status'],
      order: [['scheduledDate', 'ASC']],
      limit: 10
    });
    res.json({ interviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener entrevistas" });
  }
});

module.exports = router;