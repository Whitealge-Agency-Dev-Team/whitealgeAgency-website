import { sequelize } from "../config.js";
import { DataTypes } from "sequelize";

export const Assignment = sequelize.define("Assignment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  roleId: {
    unique: "idx_assignment",
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "roles",
      key: "id",
    },
  },
  associateId: {
    unique: "idx_assignment",
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "associates",
      key: "id",
    },
  },
  projectId: {
    unique: "idx_assignment",
    type: DataTypes.UUID,
    references: {
      model: "projects",
      key: "id",
    },
  },
});
