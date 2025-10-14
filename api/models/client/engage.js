const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const Engage = sequelize.define(
  "Engage",
  {
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Nombre de rubro") },
        notEmpty: { msg: MSG.required("Nombre de rubro") },
        max: { args: 80, msg: MSG.required("Nombre de rubro", 80) },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "engage",
  }
);

module.exports = Engage;
