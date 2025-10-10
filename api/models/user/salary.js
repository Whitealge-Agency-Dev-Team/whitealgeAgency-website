const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const Salary = sequelize.define(
  "Salary",
  {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: MSG.decimal("Cantidad"),
        min: { args: 0.01, msg: MSG.min("Cantidad", 0.01) },
        notNull: { msg: MSG.required("Cantidad") },
      },
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Descripción") },
        notEmpty: { msg: MSG.required("Descripción") },
        max: { args: 50, msg: MSG.max("Descripción", 50) }
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "salary",
  }
);

module.exports = Salary;
