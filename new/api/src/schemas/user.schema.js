const Joi = require("joi");

const fields = {
  name: Joi.string().max(50).required(),
  surname: Joi.string().max(50).required(),
  cuil: Joi.string().length(11).required(),
  cuit: Joi.string().length(11).required(),
  email: Joi.string().email().required(),
};
const password = Joi.string().min(11).required();

const userSchema = Joi.object({
  ...fields,
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
  deletetAt: Joi.date(),
});

const loginSchema = Joi.object({ email: fields.email, password });

const registerSchema = Joi.object({ ...fields, password });

module.exports = { userSchema, loginSchema, registerSchema };
