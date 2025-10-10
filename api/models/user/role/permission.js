const sequelize = require("../../../config/database");
const MSG = require("../../msg");
const { DataTypes } = require("sequelize");

const Permission = sequelize.define(
  "Permission",
  {
    code: {
      type: DataTypes.STRING(1),
      allowNull: false,
      unique: {
        name: "unique_permission_code",
        msg: MSG.unique("Código de permiso"),
      },
      validate: {
        max: { args: 1, msg: MSG.max("Código de permiso", 1) },
        notNull: { msg: MSG.required("Código de permiso") },
        notEmpty: { msg: MSG.required("Código de permiso") },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (instance, options) => {
        instance.code = instance.code.toUpperCase();
      },
    },
    timestamps: true,
    underscored: true,
    tableName: "permission",
  }
);

module.exports = Permission;
