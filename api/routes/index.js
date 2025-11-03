const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./users");
const projectRoutes = require("./projects");
const clientRoutes = require("./clients");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/clients", clientRoutes);

module.exports = router;