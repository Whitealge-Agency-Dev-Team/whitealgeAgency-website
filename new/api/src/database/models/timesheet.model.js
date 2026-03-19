const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Timesheet = sequelize.define(
  "Timesheet",
  {
    id: {
      type: DataTypes.UUID,
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
    parentId: {
      type: DataTypes.UUID,
      references: {
        model: "timesheets",
        key: "id",
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
  },
  {
    timestamps: true,
  },
);

module.exports = Timesheet;
