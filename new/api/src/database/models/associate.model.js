const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Associate = sequelize.define(
  "Associate",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
  },
  {
    underscored: true,
    timestamps: true,
    paranoid: true,
  },
);

module.exports = Associate;
