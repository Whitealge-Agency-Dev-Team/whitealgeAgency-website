const Joi = require("joi");

const fields = {
  name: Joi.string().max(50).required(),
  surname: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(11).required(),
  twoFa: Joi.bool().default(false),
};

const profileSchema = Joi.object({ twoFa: fields.twoFa });

const tokenField = Joi.string().required();

const loginSchema = Joi.object({
  email: fields.email,
  password: fields.password,
});

const registerSchema = Joi.object(fields).unknown(false);

const renewPwSchema = Joi.object({
  password: fields.password,
  token: tokenField,
});

const twoFaSchema = Joi.object({
  token: tokenField,
  code: Joi.string().length(6).required(),
});

const newPwSchema = Joi.object({
  currentPw: fields.password,
  newPw: fields.password,
});

module.exports = {
  loginSchema,
  registerSchema,
  emailField: fields.email,
  twoFaSchema,
  renewPwSchema,
  newPwSchema,
  profileSchema,
  pwField: fields.password,
  tokenField
};
