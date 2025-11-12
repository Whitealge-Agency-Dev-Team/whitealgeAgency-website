const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/auth/authToken");
const { Status } = require("../models/index");

// Listar todos los estados (protegido)
router.use(authToken);
router.get("/", async (_req, res) => {
  try {
    const rows = await Status.findAll({ order: [["id", "ASC"]] });
    res.json({ data: rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al obtener estados" });
  }
});

module.exports = router;
