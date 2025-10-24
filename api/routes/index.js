const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./users");
const projectRoutes = require("./projects");
const clientRoutes = require("./clients");
const interviewRoutes = require("./interviews");
const dashboardRoutes = require("./dashboard");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/clients", clientRoutes);
router.use("/interviews", interviewRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;