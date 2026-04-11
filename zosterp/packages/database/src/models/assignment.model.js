import { sequelize } from "../config.js";
import { DataTypes } from "sequelize";

export const Assignment = sequelize.define("Assignment", {
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
