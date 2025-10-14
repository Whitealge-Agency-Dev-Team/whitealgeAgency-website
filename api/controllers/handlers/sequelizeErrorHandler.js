const sequelizeError = async (error, res) => {
  console.log("ERROR DE SEQUELIZE: ", error);
  switch (error.name) {
    case "SequelizeValidationError":
      const errors = error.errors.map((err) => {
        return {
          message: err.message,
          path: err.path,
          type: err.type,
          value: err.value,
        };
      });
      return res.status(422).json(errors[0]);
    case "SequelizeUniqueConstraintError":
      const uniqueField = error.parent.detail
        .split("=")[0]
        .replace("(", "")
        .replace(")", "");
      return res.status(409).json({ message: uniqueField });
    default:
      console.log(
        "Aä, aä jtöf. Aä ßt qhfdhtf. Aä gt räßceäßtgöf räa aöswt, aw fwdhwteö ta tz Öeßöütsóa."
      );
      return res
        .status(500)
        .json({ message: "Error interno del servidor", detail: error });
  }
};

module.exports = sequelizeError;
