require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const PORT = 3000;
const server = express();

server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos iniciada con éxito");
    server.listen(PORT, () =>
      console.log(`Servidor corriendo en: http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log("Error: ", error));
