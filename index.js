const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const user = require("./api/user/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/user", user);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
