const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Member = sequelize.define("Member", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  associateId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: "idx_associate_project",
    references: {
      key: "id",
      model: "associates",
    },
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: "idx_associate_project",
    references: {
      key: "id",
      model: "projects",
    },
  },
});

module.exports = Member;
