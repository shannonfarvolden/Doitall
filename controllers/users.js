const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const knex = require('../db');

const UsersController = {
  //TODO: Only admin should be authorized
  // GET: List all the users
  index (req, res, next) {
    knex
      .select()
      .from('users')
      .orderBy('created_at', 'DESC')
      .then(users => {
        res.json(users);
      })
      .catch(error => res.send(error));
  },

  //POST: Creating a new user
  async create (req, res, next) {
    const {email, username, password, confirmPassword} =  req.body

    // Check password and confirmation are the same
    if (password !== confirmPassword) {
      return res.status(500).send({error: 'Password Confirmation Not Matched!'});
    }

    try {
      // Hash password before saving to db
      const passwordDigest = bcrypt.hashSync(password, 10);
      // Save user to db
      const userId = await knex
        .insert({username, email, passwordDigest}) // Same as {username: username, email: email, passwordDigest: passwordDigest}
        .into('users')
        .returning('id') // ('*') will return all columns

      if (userId) {
        // If user was successfully added, create a token
        const token = jwt.sign({ id: userId }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      } else {
        res.status(500).send("There was a problem registering the user.");
      }
    } catch (error) {
      next(error);
    }
  },

  // GET: Return current user signed in
  me (req, res, next) {
    const token = req.headers['x-access-token'];
    const showInfo = ['email', 'username'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

      knex
        .first()
        .column(showInfo)
        .from('users')
        .where({id: decoded.id[0]})
        .then(user => {
          if (!user) return res.status(404).send({error: "No user found."});
          res.json(user);
        })
        .catch(error => res.status(500).send({error: "There was a problem finding the user."}));
    });
  },

}


module.exports = UsersController
