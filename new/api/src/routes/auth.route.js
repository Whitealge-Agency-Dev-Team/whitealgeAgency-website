const express = require("express");
const {
  refresh,
  logout,
  login,
  register,
  renewPassword,
  requestNewPassword,
  verifyTwoFa,
} = require("../controllers/auth.controller");
const { getDevice } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/refresh", refresh);
router.get("/logout", logout);
router.post("/login", getDevice, login);
router.post("/register", getDevice, register);
router.post("/request-new-password", requestNewPassword);
router.post("/renew-password", renewPassword);
router.post("/verify-twofa", verifyTwoFa);

module.exports = router;
