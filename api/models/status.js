const sequelize = require("../config/database");
const MSG = require("./msg");
const { DataTypes } = require("sequelize");

const status = sequelize.define(
  "status",
  {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Nombre de estado") },
        notEmpty: { msg: MSG.required("Nombre de estado") },
        max: { args: 20, msg: MSG.max("Nombre de estado", 20) },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "status",
  }
);

module.exports = status;
