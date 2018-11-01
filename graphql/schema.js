const { makeExecutableSchema } = require('graphql-tools');
const Base = require('./base');
const User = require('./user/schema');
const Group = require('./group/schema');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs: [Base, User, Group],
    resolvers
});

module.exports = schema;
