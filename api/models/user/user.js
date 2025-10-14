const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      validate: {
        max: { args: 254, msg: MSG.max("Email", 254) },
        isEmail: { msg: MSG.email },
        notEmpty: { msg: MSG.required("Email") },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        max: { args: 15, msg: MSG.max("Número de teléfono", 15) },
        isNumeric: { msg: MSG.numeric("Número de teléfono") },
        notEmpty: { msg: MSG.required("Número de teléfono") },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      allowNull: false,
      validate: {
        notNull: MSG.required("Estado de actividad"),
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
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        max: { args: 255, msg: MSG.max("Hash de contraseña", 255) },
        notEmpty: { msg: MSG.required("Hash de contraseña") },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "user",
    indexes: [
      {
        unique: true,
        fields: ["deleted_at", "email", "phone_number"],
        name: "unique_existent_user",
      },
    ],
  }
);

module.exports = User;
