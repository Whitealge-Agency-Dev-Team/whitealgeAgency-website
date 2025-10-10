const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const Objective = sequelize.define(
  "Objective",
  {
    description: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Descripción de objetivo") },
        notEmpty: { msg: MSG.required("Descripción de objetivo") },
        max: { args: 150, msg: MSG.max("Descripción de objetivo", 150) },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "objective",
  }
);

module.exports = Objective;
