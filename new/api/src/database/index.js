const sequelize = require("./config")
const models = require("./models")


module.exports = { sequelize, ...models }