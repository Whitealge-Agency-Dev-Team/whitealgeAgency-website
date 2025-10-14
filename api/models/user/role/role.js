const sequelize = require("../../../config/database");
const MSG = require("../../msg");
const { DataTypes } = require("sequelize");

const Role = sequelize.define(
  "Role",
  {
    code: {
      type: DataTypes.STRING(1),
      allowNull: false,
      unique: {
        name: "unique_role_code",
        msg: MSG.unique("Código de rol"),
      },
      validate: {
        max: { args: 1, msg: MSG.max("Código de rol", 1) },
        notNull: { msg: MSG.required("Código de rol") },
        notEmpty: { msg: MSG.required("Código de rol") },
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
    tableName: "role",
  }
);

module.exports = Role;
