const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Associate = sequelize.define("Associate", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: "idx_company_user",
    references: {
      model: "companies",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: "idx_company_user",
    references: {
      model: "users",
      key: "id",
    },
  },
});

module.exports = Associate;
