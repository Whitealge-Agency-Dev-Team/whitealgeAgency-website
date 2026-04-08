const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Assignment = sequelize.define("Assignment", {
  roleId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: "roles",
      key: "id",
    },
  },
  associateId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: "associates",
      key: "id",
    },
  },
  projectId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: "projects",
      key: "id",
    },
  },
});

module.exports = Assignment;
