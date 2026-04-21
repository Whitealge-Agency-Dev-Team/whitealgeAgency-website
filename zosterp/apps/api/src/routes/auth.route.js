import { Router } from "express";
import { getDevice, setBodyLanguage, validate } from "../middlewares/index.js";
import {
  authenticate,
  logout,
  refresh,
  renewPassword,
  requestRenewPassword,
  verif2fa,
} from "../controllers/auth.controller.js";
import {
  email,
  loginSchema,
  registerSchema,
  renewPasswordSchema,
  schema2fa,
} from "@zosterp/schemas";
import { generateTokens } from "../handlers/auth.handler.js";

export const authRoute = Router();

authRoute.post(
  "/register",
  setBodyLanguage,
  validate(registerSchema),
  authenticate,
  getDevice,
  generateTokens,
);

authRoute.post(
  "/login",
  validate(loginSchema),
  authenticate,
  getDevice,
  generateTokens,
);

authRoute.post(
  "/2fa",
  validate(schema2fa),
  verif2fa,
  getDevice,
  generateTokens,
);

authRoute.get("/refresh", refresh, getDevice, generateTokens);
authRoute.get("/logout", logout);
authRoute.post("/password", validate(email), requestRenewPassword);
authRoute.patch("/password", validate(renewPasswordSchema), renewPassword);
