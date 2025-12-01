const { DataTypes } = require("sequelize");
const db = require("../config/database");
const User = require("./user/user");
const Project = require("./project/project");

const userProject = db.define(
  "user_project",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Project, key: "id" },
    },
  },
  {
    timestamps: true,
    tableName: "user_project",
    underscored: true,
  }
);

module.exports = userProject;
