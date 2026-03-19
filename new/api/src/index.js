require("dotenv-safe").config();
const express = require("express");
const { sequelize } = require("./database");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.API_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

sequelize.sync({ force: true }).then(() => {
  console.log("DB initted");
  app.listen(process.env.API_PORT | 3000, () => console.log("API working"));
});
