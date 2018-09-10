const { Router } = require("express");
const UsersController = require('./controllers/users');
const SessionsController = require('./controllers/sessions');
const GroupsController = require('./controllers/groups');
const GroupMembersController = require('./controllers/groupMembers');

// Define Router Instances
const root = Router();
const users = Router();
const session = Router();
const groups = Router();
const groupMembers = Router({mergeParams: true});


root.get("/api/test", (req, res) => {
  res.send({ name: "first endpoint!" });
});

// User Routes
root.use('/api/me', UsersController.me);
root.use('/api/users', users);
users.get('/', UsersController.index);
users.get('/:id', UsersController.show);
users.post('/', UsersController.create);

// Session Routes
root.use('/api/session', session);
session.post('/', SessionsController.create);
session.delete('/', SessionsController.destroy);

// Nest groupMembers' routes inside groups
groups.use('/:groupId', groupMembers);
// Group Routes
root.use('/api/groups', groups);
groups.get('/', GroupsController.index);
groups.post('/', GroupsController.create);
groups.get('/:groupId/members', GroupsController.getMembers);

//GroupMembers Routes
groupMembers.post('/addmembers', GroupMembersController.create);

module.exports = root;
