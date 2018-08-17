const { Router } = require("express");
const GroupsController = require('./controllers/groups');

// Define Router Instances
const root = Router();
const groups = Router();

root.get("/api/test", (req, res) => {
  res.send({ name: "first endpoint!" });
});

// Trip Routes
root.use('/api/groups', groups);
groups.get('/', GroupsController.index);
groups.post('/', GroupsController.create);

module.exports = root;
