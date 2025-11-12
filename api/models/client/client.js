const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

// Modelo Client con atributos lógicos (usados por la API/Front) mapeados a columnas físicas existentes
// Logical → Physical (field):
//  - companyName → name
//  - contactEmail → email
//  - phone → phone_number
//  - problemDescription → description
//  - industry → industry (puede agregarse por migración/auto-upgrade)
//  - statusId → status_id (FK a status)
const Client = sequelize.define(
  "Client",
  {
    companyName: {
      type: DataTypes.STRING(60),
      allowNull: false,
      field: "name",
      validate: {
        notNull: { msg: MSG.required("Nombre de cliente") },
        notEmpty: { msg: MSG.required("Nombre de cliente") },
        max: { args: 60, msg: MSG.required("Nombre de cliente", 60) },
      },
    },
    problemDescription: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "description",
      validate: {
        notNull: { msg: MSG.required("Descripción de cliente") },
        notEmpty: { msg: MSG.required("Descripción de cliente") },
        max: { args: 150, msg: MSG.required("Descripción de cliente", 150) },
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
      allowNull: true, // opcional para permitir leads sin CUIT
      validate: {
        max: { args: 15, msg: MSG.required("CUIT de cliente", 15) },
      },
    },
    contactEmail: {
      type: DataTypes.STRING(254),
      allowNull: false,
      field: "email",
      validate: {
        notNull: { msg: MSG.required("Email de cliente") },
        notEmpty: { msg: MSG.required("Email de cliente") },
        max: { args: 254, msg: MSG.required("Email de cliente", 254) },
        isEmail: { msg: MSG.email },
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "phone_number",
      validate: {
        notNull: { msg: MSG.required("Número telefónico de cliente") },
        notEmpty: { msg: MSG.required("Número telefónico de cliente") },
        max: { args: 20, msg: MSG.required("Número telefónico de cliente", 20) },
      },
    },
    industry: {
      type: DataTypes.STRING(80),
      allowNull: true, // puede no existir la columna; se agrega en boot si falta
      field: "industry",
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "status_id",
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
