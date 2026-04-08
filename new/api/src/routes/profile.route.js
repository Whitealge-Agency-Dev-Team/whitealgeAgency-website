const express = require("express");
const {
  getProfile,
  deleteProfile,
  changeEmail,
  requestChangeEmail,
  changePw,
  updateProfile,
  getSessions,
  deleteSession,
} = require("../controllers/profile.controller");

const router = express.Router();

router.get("/", getProfile);
router.patch("/", updateProfile);
router.patch("/password", changePw);
router.post("/email-request", requestChangeEmail);
router.patch("/email", changeEmail);
router.delete("/", deleteProfile);

router.get("/sessions", getSessions);
router.delete("/sessions/:id", deleteSession);

module.exports = router;
