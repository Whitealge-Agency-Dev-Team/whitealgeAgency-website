const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const Representative = sequelize.define(
  "Representative",
  {
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        max: { args: 15, msg: MSG.max("Número de teléfono", 15) },
        isNumeric: { msg: MSG.numeric("Número de teléfono") },
        notEmpty: { msg: MSG.required("Número de teléfono") },
      },
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        is: {
          args: /^\p{L}+$/u,
          msg: MSG.alpha("Nombre"),
        },
        max: { args: 40, msg: MSG.max("Nombre", 40) },
        notEmpty: { msg: MSG.required("Nombre") },
      },
    },
    surname: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        is: {
          args: /^\p{L}+$/u,
          msg: MSG.alpha("Apellido"),
        },
        max: { args: 40, msg: MSG.max("Apellido", 40) },
        notEmpty: { msg: MSG.required("Apellido") },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "representative",
    indexes: [
      {
        unique: true,
        fields: ["deleted_at", "phone_number"],
        name: "unique_existent_representative",
      },
    ],
  }
);

module.exports = Representative;
