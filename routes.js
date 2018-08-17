const { Router } = require("express");

const root = Router();

root.get("/api/test", (req, res) => {
  res.send({ name: "first endpoint!" });
});

module.exports = root;
