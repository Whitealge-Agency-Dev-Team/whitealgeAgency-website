const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const Note = sequelize.define(
  "Note",
  {
    description: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Descripción de nota") },
        notEmpty: { msg: MSG.required("Descripción de nota") },
        max: { args: 80, msg: MSG.required("Descripción de nota", 80) },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "note",
  }
);

module.exports = Note;
