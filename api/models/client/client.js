const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const Client = sequelize.define(
  "Client",
  {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Nombre de cliente") },
        notEmpty: { msg: MSG.required("Nombre de cliente") },
        max: { args: 60, msg: MSG.required("Nombre de cliente", 60) },
      },
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Descripción de cliente") },
        notEmpty: { msg: MSG.required("Descrpción de cliente") },
        max: { args: 80, msg: MSG.required("Descripción de client", 80) },
      },
    },
    employeeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isInt: { msg: MSG.int("Cantidad de empleados") },
        notNull: { msg: MSG.required("Cantidad de empleados") },
        min: { args: 1, msg: MSG.min("Cantidad de empleados", 1) },
      },
    },
    cuit: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("CUIT de cliente") },
        notEmpty: { msg: MSG.required("CUIT de cliente") },
        max: { args: 15, msg: MSG.required("CUIT de cliente", 15) },
      },
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Email de cliente") },
        notEmpty: { msg: MSG.required("Email de cliente") },
        max: { args: 254, msg: MSG.required("Email de cliente", 254) },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isNumeric: { msg: MSG.numeric("Número telefónico") },
        notNull: { msg: MSG.required("Número telefónico de cliente") },
        notEmpty: { msg: MSG.required("Número telefónico de cliente") },
        max: {
          args: 254,
          msg: MSG.required("Número telefónico de cliente", 254),
        },
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["deleted_at", "email", "phone_number", "cuit"],
        name: "unique_existent_client",
      },
    ],
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "client",
  }
);

module.exports = Client;
