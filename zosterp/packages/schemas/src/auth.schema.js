import Joi from "joi";
import { languageList } from "@zosterp/locales";

export const email = Joi.string()
  .email({ tlds: { allow: false } })
  .trim()
  .required()
  .messages({
    "string.empty": "email_required",
    "string.email": "email_invalid",
    "any.required": "email_required",
  });

const password = Joi.string().trim().min(11).required().messages({
  "string.empty": "password_required",
  "string.min": "password_too_short",
  "any.required": "password_required",
});

const confirmPassword = Joi.string()
  .required()
  .valid(Joi.ref("password"))
  .messages({
    "string.empty": "confirmPassword_required",
    "any.required": "confirmPassword_required",
    "any.only": "confirmPassword_not_match",
  });

const token = Joi.string().required().messages({
  "string.empty": "token_required",
  "any.required": "token_required",
});

export const registerSchema = Joi.object({
  name: Joi.string().trim().lowercase().required().messages({
    "string.empty": "name_required",
    "any.required": "name_required",
  }),
  surname: Joi.string().trim().lowercase().required().messages({
    "string.empty": "surname_required",
    "any.required": "surname_required",
  }),
  email,
  password,
  confirmPassword,
  language: Joi.string()
    .valid(...languageList)
    .default("en")
    .messages({ "any.only": "language_invalid" }),
});

export const schema2fa = Joi.object({
  code: Joi.string().length(6).required().messages({
    "string.empty": "code_required",
    "any.required": "code_required",
    "string.length": "code_invalid",
  }),
  token,
});

export const renewPasswordSchema = Joi.object({
  token,
  password,
  confirmPassword,
});

export const loginSchema = Joi.object({ password, email });
