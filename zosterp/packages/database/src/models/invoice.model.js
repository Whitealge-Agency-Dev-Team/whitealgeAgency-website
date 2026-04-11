import { sequelize } from "../config.js";
import { DataTypes } from "sequelize";

export const Invoice = sequelize.define("Invoice", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

