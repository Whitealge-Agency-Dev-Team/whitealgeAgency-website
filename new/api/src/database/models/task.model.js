const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "projects",
      key: "id",
    },
  },
  parentId: {
    type: DataTypes.UUID,
    references: {
      model: "tasks",
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
});

module.exports = Task;
