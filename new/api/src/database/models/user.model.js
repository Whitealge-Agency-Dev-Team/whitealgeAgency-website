const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const { hash, compare, genSalt } = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cuil: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    cuit: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeValidate: async (instance) => {
        if (instance.password) {
          const salt = await genSalt();
          instance.passwordHash = await hash(instance.password, salt);
        }
      },
    },
  },
);

User.prototype.comparePassword = async function (password) {
  return compare(password, this.passwordHash);
};

module.exports = User;
