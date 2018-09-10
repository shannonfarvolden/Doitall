const userResolvers = {
    UserQuery: {
        Users: (_, __, context) => context.pgClient
            .query('SELECT * from users')
            .then(res => res.rows),
        User: (_, { id }, context) => context.pgClient
            .query('SELECT * from users WHERE id = $1', [id])
            .then(res => res.rows),
    }
};


module.exports = userResolvers;
