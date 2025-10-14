const sequelize = require("../../config/database");
const MSG = require("../msg");
const { DataTypes } = require("sequelize");

const ProjectDimiss = sequelize.define(
  "ProjectDimiss",
  {
    dimissReason: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        notEmpty: { msg: MSG.required("Ranzón de baja") },
        notNull: { msg: MSG.required("Razón de baja") },
        max: { args: 40, msg: MSG.max("Razón de baja", 40) },
      },
    },
    stillDimissed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      validate: {
        notNull: { msg: MSG.required("Estado de baja") },
      },
    },
  },
  {
    hooks: {
      beforeUpdate: async (instance, options) => {
        if (
          instance.changed("stillDimissed") &&
          instance.stillDimissed === false
        )
          throw new Error("Estado de baja bloqueado una vez revertido.");
      },
      beforeCreate: async (instance, options) => {
        instance.stillDimissed = true;
        instance.updatedAt = null;
      },
    },
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "project_dimiss",
  }
);

module.exports = ProjectDimiss;
