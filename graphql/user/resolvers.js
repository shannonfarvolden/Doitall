const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

export const Query = {
  Users: (_, __, context) => context.knex
    .select()
    .from('users')
    .orderBy('created_at', 'DESC')
    .then(users => { return users }),
  User: (_, { id }, context) => context.knex
    .first()
    .from('users')
    .where({id})
    .then(user => { return user }),
}

export const Mutation = {
  createUser: async (_, { username, email, password, role }, context) => {
    const newUser = await context.knex
      .insert({username, email, password: bcrypt.hashSync(password, 10), role})
      .into('users')
      .returning('*')
      .then(res => res[0]);

    return jwt.sign({
      id: newUser.id,
      username: newUser.username
    }, process.env.JWT_SECRET, { expiresIn: 86400 });
  },
  login: async (_, { username, password }, context) => {
    const user = await context.knex.first().from('users').where({username});
    if (!user) {
      throw new Error('No user found');
    }
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      throw new Error('Incorrect password');
    }
    return jwt.sign({
      id: user.id,
      username: user.username
    }, process.env.JWT_SECRET, { expiresIn: 86400 });
  }
}
