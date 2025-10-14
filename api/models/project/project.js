const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const Project = sequelize.define(
  "Project",
  {
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Descripción de proyecto") },
        notEmpty: { msg: MSG.required("Descripción de proyecto") },
        max: { args: 255, msg: MSG.max("Descripción de proyecto", 255) },
      },
    },
    estimatedFinish: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Fecha de finalización estimada") },
        isDate: { msg: MSG.date("Fecha de finalización estimada") },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "project",
  }
);

module.exports = Project;
