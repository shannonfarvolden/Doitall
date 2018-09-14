const { makeExecutableSchema } = require('graphql-tools');
const User = require('./user/schema');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs: [User],
    resolvers,
});

module.exports = schema;
