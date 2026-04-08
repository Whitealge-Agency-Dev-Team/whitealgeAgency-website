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
    has_2fa: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    defaultScope: { attributes: { exclude: ["passwordHash"] } },
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
