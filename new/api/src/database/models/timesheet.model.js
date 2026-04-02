const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Timesheet = sequelize.define(
  "Timesheet",
  {
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
    memberId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        key: "id",
        model: "members",
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
  }
);

module.exports = Timesheet;
