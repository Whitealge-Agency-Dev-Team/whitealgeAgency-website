const sequelize = require("../../../config/database");
const MSG = require("../../msg");
const { DataTypes } = require("sequelize");

const Resource = sequelize.define(
  "Resource",
  {
    name: {
      type: DataTypes.STRING(1),
      allowNull: false,
      unique: {
        name: "unique_resource_name",
        msg: MSG.unique("Nombre de recurso"),
      },
      validate: {
        max: { args: 1, msg: MSG.max("Nombre de recurso", 1) },
        notNull: { msg: MSG.required("Nombre de recurso") },
        notEmpty: { msg: MSG.required("Nombre de recurso") },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (instance, options) => {
        instance.name = instance.name.toUpperCase();
      },
    },
    timestamps: true,
    underscored: true,
    tableName: "resource",
  }
);

module.exports = Resource;
