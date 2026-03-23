const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(""),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  },
);

module.exports = Project;
