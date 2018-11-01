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
};