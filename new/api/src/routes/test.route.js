const express = require("express");
const { getDevice } = require("../middlewares/auth.middleware");

const route = express.Router();

route.get("/", (_, res, next) => {
  try {
    return res.status(200).send("OK");
  } catch (error) {
    return next(error);
  }
});

route.get("/ua", getDevice, (req, res, next) => {
  try {
    return res.status(200).send(req.ua);
  } catch (error) {
    return next(error);
  }
});

module.exports = route;
