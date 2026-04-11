import { sequelize } from "../config.js";
import { DataTypes } from "sequelize";

export const Associate = sequelize.define("Associate", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: "idx_company_user",
    references: {
      model: "companies",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: "idx_company_user",
    references: {
      model: "users",
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM("active"),
    defaultValue: "active",
  },
  metadata: {
    type: DataTypes.JSONB,
  },
});
