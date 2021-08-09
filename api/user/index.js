// 라우팅 설정
const express = require("express");
const router = express.Router();

const users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

router.get("/", (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

router.get("/:id", function (req, res) {
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

router.delete("/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  users.splice(id, 1);
  res.status(204).end();
});

router.post("/", function (req, res) {
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

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }

  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).end();
  }

  const isDuplicate = users.reduce(
    (result, user) => (user.name === name ? true : false),
    false
  );
  if (isDuplicate) {
    return res.status(409).end();
  }

  user.name = name;

  res.json(user);
});

module.exports = router;