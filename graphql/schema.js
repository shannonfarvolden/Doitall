const { makeExecutableSchema, addMockFunctionsToSchema, mergeSchemas } = require('graphql-tools');
const User = require('./user/schema');
const resolvers = require('./resolvers');

const userSchema = makeExecutableSchema({
    typeDefs: User
});

addMockFunctionsToSchema({ schema: userSchema });

const schema = mergeSchemas({
    schemas: [userSchema],
    resolvers
});

module.exports = schema;
