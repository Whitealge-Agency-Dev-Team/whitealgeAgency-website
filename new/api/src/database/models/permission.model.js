const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Permission = sequelize.define(
  "Permission",
  {
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "roles",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    action: {
      type: DataTypes.ENUM("CREATE", "READ", "UPDATE", "DELETE"),
      allowNull: false,
      primaryKey: true,
    },
    resource: {
      type: DataTypes.ENUM(""),
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    paranoid: false,
    timestamps: false,
  },
);

module.exports = Permission;
