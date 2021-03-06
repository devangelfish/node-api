const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const user = require("./api/user/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.node_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use("/user", user);

module.exports = app;
