export const Query = {
    Groups: (_, __, context) => context.knex
        .select()
        .from('groups')
        .orderBy('created_at', 'DESC')
        .then(groups => { return groups }),
    Group: (_, { id }, context) => context.knex
        .first()
        .from('groups')
        .where({id})
        .then(group => { return group })
};
