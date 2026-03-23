require("dotenv-safe").config();
const coookieParser = require("cookie-parser")
const express = require("express");
const sequelize = require("./database/config");
const cors = require("cors");
const { authRouter } = require("./routes");

const app = express();

app.use(express.json());
app.use(coookieParser())
app.use(
  cors({
    //origin: process.env.API_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

app.get("/health", (_, res) => res.status(200).send("OK"));
app.use("/auth", authRouter);

sequelize
  .sync({ force: true })
  .then(() =>
    app.listen(process.env.API_PORT || 3000, () => console.log("API working")),
  );
