import { Router } from "express";
import { getDevice } from "../middlewares/index.js";
import {
  register,
  logout,
  login,
  refresh,
  renewPassword,
  requestNewPassword,
  verifyTwoFa,
} from "../controllers/auth.controller.js";

export const authRoute = Router();

authRoute.post("/login", getDevice, login);
authRoute.post("/register", getDevice, register);
authRoute.get("/refresh", refresh);
authRoute.get("/logout", logout);
authRoute.post("/request-new-password", requestNewPassword);
authRoute.post("/renew-password", renewPassword);
authRoute.post("/verify-2fa", verifyTwoFa);
