const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
  },
});

module.exports = Role;
