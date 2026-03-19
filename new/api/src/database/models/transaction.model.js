const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    associateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "transactions",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(""),
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Transaction;
