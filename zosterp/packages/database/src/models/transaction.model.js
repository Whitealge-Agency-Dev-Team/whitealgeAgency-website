import { sequelize } from "../config.js";
import { DataTypes } from "sequelize";

export const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  parentId: {
    type: DataTypes.UUID,
    references: {
      model: "transactions",
      key: "id",
    },
  },
  assignmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "assignments",
      key: "id",
    },
  },
  method: {
    type: DataTypes.ENUM("cash"),
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  installments: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  currency: {
    type: DataTypes.ENUM("ARS", "USD", "EUR"),
    defaultValue: "ARS",
    allowNull: false,
  },
  ocurred_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW(),
  },
  isFixed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isProfit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "cancelled", "done"),
    allowNull: false,
  },
});
