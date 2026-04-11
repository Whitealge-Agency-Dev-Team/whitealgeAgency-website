import { sequelize } from "../config.js";
import { DataTypes } from "sequelize";

export const Timesheet = sequelize.define("Timesheet", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  taskId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "tasks",
      key: "id",
    },
  },
  associateId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: "id",
      model: "associates",
    },
  },
  started_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  finished_at: {
    type: DataTypes.DATE,
  },
  paid_at: {
    type: DataTypes.DATE,
  },
});
