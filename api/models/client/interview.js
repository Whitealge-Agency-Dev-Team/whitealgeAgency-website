const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const Interview = sequelize.define(
  "Interview",
  {
    description: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Descripción de entrevista") },
        notEmpty: { msg: MSG.required("Descripción de entrevista") },
        max: { args: 80, msg: MSG.required("Descripción de entrevista", 80) },
      },
    },
    interviewDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Fecha de entrevista") },
        isDate: { msg: MSG.date("Fecha de entevista") }
      }
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "interview",
  }
);

module.exports = Interview;
