const Joi = require("joi");

const fields = {
  name: Joi.string().max(50).required(),
  surname: Joi.string().max(50).required(),
  cuit: Joi.string().length(11).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(11).required(),
  twoFa: Joi.bool().default(false)
};

const tokenField = Joi.string().required();

const loginSchema = Joi.object({
  email: fields.email,
  password: fields.password,
});

const registerSchema = Joi.object(fields);

const renewPwSchema = Joi.object({
  password: fields.password,
  token: tokenField,
});

const twoFaSchema = Joi.object({
  token: tokenField,
  code: Joi.string().length(6).required()
})

module.exports = {
  loginSchema,
  registerSchema,
  emailField: fields.email,
  twoFaSchema,
  renewPwSchema
};
