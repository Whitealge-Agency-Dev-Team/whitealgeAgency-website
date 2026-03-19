const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Log = sequelize.define(
  "Log",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    associateId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "associates",
        key: "id",
      },
    },
    ocurredAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    action: {
      type: DataTypes.STRING,
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

module.exports = Log;
