const Joi = require("joi");

const fields = {
  name: Joi.string().max(50).required(),
  surname: Joi.string().max(50).required(),
  cuil: Joi.string().length(11).required(),
  cuit: Joi.string().length(11).required(),
  email: Joi.string().email().required(),
};
const password = Joi.string().min(11).required();

const loginSchema = Joi.object({ email: fields.email, password });

const registerSchema = Joi.object({ ...fields, password });

module.exports = { loginSchema, registerSchema };
