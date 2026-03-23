const sequelize = require("../config");
const { DataTypes, Op } = require("sequelize");

const Token = sequelize.define(
  "Token",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
    },
    device: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    scopes: {
      active: {
        where: {
          expiredAt: { [Op.gt]: new Date() },
        },
      },
    },
    hooks: {
      beforeCreate: async (instance) => {
        await instance.constructor.destroy({
          where: { userId: instance.userId, device: instance.device },
        });
      },
    },
  },
);

module.exports = Token;
