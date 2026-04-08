require("dotenv-safe").config();
const coookieParser = require("cookie-parser");
const express = require("express");
const sequelize = require("./database/config");
const cors = require("cors");
const { authRouter, profileRouter, testRouter } = require("./routes");
const errorHandler = require("./handlers/error.handler");
const { isAuth } = require("./middlewares/auth.middleware");

const corsConfig = cors({
  origin: process.env.API_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
});

const app = express();

app.use(express.json());
app.use(coookieParser());
app.use(corsConfig);
app.use("/test", testRouter);
app.use("/auth", authRouter);
app.use("/profile", isAuth, profileRouter);
 
app.use(errorHandler);

sequelize
  .sync({ force: true })
  .then(() =>
    app.listen(process.env.API_PORT || 3000, () => console.log("API working")),
  );
