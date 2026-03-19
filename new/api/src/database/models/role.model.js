const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
  },
});

module.exports = Role;
