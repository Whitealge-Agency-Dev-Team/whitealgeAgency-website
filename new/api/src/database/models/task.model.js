const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Task = sequelize.define(
  "Task",
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
    description: {
      type: DataTypes.STRING,
    },
    objective: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approx_finish_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM(""),
    },
    metadata: {
      type: DataTypes.JSONB,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  },
);

module.exports = Task;
