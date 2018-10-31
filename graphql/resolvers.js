const userResolvers = require('./user/resolvers');
const resolvers = {
  ...userResolvers,
};

module.exports = resolvers;
