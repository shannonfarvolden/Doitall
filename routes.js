const { Router } = require("express");
const UsersController = require('./controllers/users');
const SessionsController = require('./controllers/sessions');
const GroupsController = require('./controllers/groups');

// Define Router Instances
const root = Router();
const users = Router();
const groups = Router();
const session = Router();

root.get("/api/test", (req, res) => {
  res.send({ name: "first endpoint!" });
});

// User Routes
root.use('/api/me', UsersController.me);
root.use('/api/users', users);
users.get('/', UsersController.index);
users.post('/', UsersController.create);

// Session Routes
root.use('/api/session', session);
session.post('/', SessionsController.create);
session.delete('/', SessionsController.destroy);

// Group Routes
root.use('/api/groups', groups);
groups.get('/', GroupsController.index);
groups.post('/', GroupsController.create);

module.exports = root;
