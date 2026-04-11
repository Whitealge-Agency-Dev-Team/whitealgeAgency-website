import { sequelize } from "../config.js";
import { DataTypes } from "sequelize";

export const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
  },
});
