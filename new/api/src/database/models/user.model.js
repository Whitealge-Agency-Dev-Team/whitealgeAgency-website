const sequelize = require("../config")
const { DataTypes } = require("sequelize")
const { hash, compare, genSalt } = require("bcrypt")

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
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
            async set(value) {
                this.setDataValue("passwordHash", hash(value, genSalt()))
            }
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true
    }
)

User.prototype.comparePassword = async function () {
    return compare(password, this.passwordHash)
}

module.exports = User