import Joi from "joi";

const tokenField = Joi.string().required().messages({
  "string.base": "TOKEN_STR",
  "any.required": "TOKEN_EMPTY",
  "string.empty": "TOKEN_EMPTY",
});

const pwField = Joi.string().min(11).required().messages({
  "string.base": "PW_STR",
  "string.min": "PW_MIN.{#limit}",
  "any.required": "PW_EMPTY",
  "string.empty": "PW_EMPTY",
});

export const emailField = Joi.string().email().required().messages({
  "string.base": "EMAIL_STR",
  "string.email": "EMAIL_FORMAT",
  "string.empty": "EMAIL_EMPTY",
  "any.required": "EMAIL_EMPTY",
});

const fields = {
  name: Joi.string().required().messages({
    "string.base": "NAME_STR",
    "string.empty": "NAME_EMPTY",
    "any.required": "NAME_EMPTY",
  }),
  surname: Joi.string().required().messages({
    "string.base": "SURNAME_STR",
    "string.empty": "SURNAME_EMPTY",
    "any.required": "SURNAME_EMPTY",
  }),
  password: pwField,
  has_2fa: Joi.bool().default(false).messages({
    "boolean.base": "2FA_BOOL",
  }),
  language: Joi.string().length(2).default("en").messages({
    "string.base": "LANG_STR",
    "string.length": "LANG_LEN.{#limit}",
  }),
};

export const registerSchema = Joi.object({ ...fields, email: emailField });

export const loginSchema = Joi.object({
  email: emailField,
  password: fields.password,
});

export const renewPwSchema = Joi.object({
  token: tokenField,
  password: pwField,
});

export const twoFaSchema = Joi.object({
  token: tokenField,
  code: Joi.string().length(6).required().messages({
    "string.base": "CODE_STR",
    "string.empty": "CODE_EMPTY",
    "any.required": "CODE_EMPTY",
    "string.length": "CODE_LEN.{#limit}",
  }),
});
