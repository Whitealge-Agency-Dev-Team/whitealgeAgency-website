const sequelize = require("../config")
const { DataTypes } = require("sequelize")

const Permission = sequelize.define(
    "Permission",
    {
        roleId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Role",
                key: "id"
            }
        },
        action: {
            type: DataTypes.ENUM("C", "R", "U", "D"),
            allowNull: false,
            primaryKey: true
        },
        resource: {
            type: DataTypes.ENUM(""),
            allowNull: false,
            primaryKey: true
        }
    },
    {
        underscored: true
    }
)

module.exports = Permission