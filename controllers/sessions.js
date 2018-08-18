const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const knex = require('../db');

const SessionsController = {
  //Post: Sign in user. Create JWT
  async create (req, res, next) {
    const {email, password} = req.body;
    try {
      const user = await knex.first().from('users').where({email});
      if (user && bcrypt.compareSync(password, user.passwordDigest)) {
        const token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
      } else {
        res.status(404).send('No user found.');
      }
    } catch (error) {
      res.status(500).send('Error on the server.');
    }
  },

  // TODO: Destroy JWT in localstorage in ClientSide
  //DELETE: Sign out user.
  destroy (req, res, next) {
    res.status(200).send({ auth: false, token: null });
  }
}

module.exports = SessionsController





// bump
