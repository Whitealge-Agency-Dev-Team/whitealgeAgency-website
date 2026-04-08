const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  associateId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "associates",
      key: "id",
    },
  },
  invoiceId: {
    type: DataTypes.UUID,
    references: {
      model: "invoices",
      key: "id",
    },
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.ENUM("ARS", "USD", "EUR"),
    defaultValue: "ARS",
    allowNull: false,
  },
  emitted_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW(),
  },
  status: {
    type: DataTypes.ENUM(""),
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSONB,
  },
});

module.exports = Transaction;
