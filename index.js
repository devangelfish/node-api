const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/users", (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get("/user/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = users.find(({ id: userId }) => userId === id);

  if (!user) {
    return res.status(404).end();
  }

  res.json(user);
});

app.delete("/user/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  users.splice(id, 1);
  res.status(204).end();
});

app.post("/user", function (req, res) {
  const name = req.body.name;

  users.forEach(({ name }) => console.log(name));

  if (!name) return res.status(400).end();

  const isConfilct = users.some(({ name: userName }) => userName === name);

  if (isConfilct) {
    return res.status(409).end();
  }

  const id = Date.now();
  const user = {
    name,
    id,
  };
  users.push(user);
  res.status(201).json(user);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
