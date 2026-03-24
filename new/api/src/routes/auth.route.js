const express = require("express");
const { login, register, refresh, logout } = require("../controllers/auth.controller")
const error = require("../handlers/error.handler")

const router = express.Router();

router.post("/login", error, login)
router.post("/register", error, register)
router.get("/refresh", error, refresh)
router.get("/logout", error, logout)

module.exports = router