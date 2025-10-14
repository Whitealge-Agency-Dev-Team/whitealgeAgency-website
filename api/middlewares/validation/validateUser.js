const joi = require("joi");

const validateUser = (req, res, next) => {
  const userSchema = joi
    .object({
      email: joi.string().max(254).required(),
      phoneNumber: joi.string().max(15).required(),
      name: joi.string().max(40).required(),
      surname: joi.string().max(40).required(),
      password: joi.string().max(255).required(),
    })
    .options({ abortEarly: false });

  const response = userSchema.validate(req.body);

  if (response.error) {
    return res.json({ status: 400, message: "Error al validar los datos." });
  }
  next();
};

module.exports = {validateUser}