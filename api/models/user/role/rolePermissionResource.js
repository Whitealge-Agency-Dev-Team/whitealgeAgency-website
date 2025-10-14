const sequelize = require("../../../config/database");
const MSG = require("../../msg");
const { DataTypes } = require("sequelize");

const RolePermissionResource = sequelize.define(
  "RolePermissionRole",
  {
    roleId: {
      type: DataTypes.INTEGER,
    },
    permissionId: {
      type: DataTypes.INTEGER,
    },
    roleId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "role_permission_resource",
  }
);

module.exports = RolePermissionResource;
