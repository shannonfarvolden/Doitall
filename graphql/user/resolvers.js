export const Query = {
  Users: (_, __, context) =>
  { console.log("in users")
    return context.knex
    .select()
    .from('users')
    .orderBy('created_at', 'DESC')
    .then(users => { return users })},
  User: (_, { id }, context) => context.knex
    .first()
    .from('users')
    .where({id})
    .then(user => { console.log(user); return user }),
}

export const Mutation = {
  createUser: (_, { username, email, password }, context) => context.knex
    .insert({username, email, password})
    .into('users')
    .returning('*')
    .then(res => res[0])
}
