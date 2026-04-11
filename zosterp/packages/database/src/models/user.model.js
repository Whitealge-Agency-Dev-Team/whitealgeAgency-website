import { sequelize } from "../config.js";
import { DataTypes } from "sequelize";
import { hash, compare, genSalt } from "bcrypt";

export const User = sequelize.define(
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
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: { len: [11, 255] },
    },
    language: {
      type: DataTypes.ENUM("en", "es"),
      defaultValue: "en",
    },
  },
  {
    defaultScope: { attributes: { exclude: ["passwordHash"] } },
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          const salt = await genSalt(10);
          user.passwordHash = await hash(user.password, salt);
        }
      },
    },
  },
);

User.prototype.comparePassword = async function (password) {
  if (!this.passwordHash) {
    throw new Error(
      "Password hash not loaded. Ensure you used .unscoped() during find.",
    );
  }
  return compare(password, this.passwordHash);
};
