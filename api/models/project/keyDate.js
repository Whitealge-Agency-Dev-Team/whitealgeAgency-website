const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const KeyDate = sequelize.define(
  "KeyDate",
  {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Título de fecha clave") },
        notEmpty: { msg: MSG.required("Título de fecha clave") },
        max: { args: 50, msg: MSG.max("Título de fecha clave", 50) },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {msg: MSG.required("Fecha clave")},
        isDate: { msg: MSG.date("Fecha clave") }
      }
    }
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "key_date",
  }
);

module.exports = KeyDate;
