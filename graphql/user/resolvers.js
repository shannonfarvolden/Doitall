const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

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
  createUser: async (_, { username, email, password }, context) => {
    const newUser = await context.knex
      .insert({username, email, password: bcrypt.hashSync(password, 10)})
      .into('users')
      .returning('*')
      .then(res => res[0])

    return jwt.sign({
      id: newUser.id,
      username: newUser.username
    }, config.secret, { expiresIn: 86400 });
  }
}
