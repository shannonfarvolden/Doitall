const graphql = require('graphql');
const UsersController = require('../controllers/users');
const knex = require('../db');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    passwordDigest: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
          return UsersController.show(args.id);
        // return knex
        //   .first()
        //   .from('users')
        //   .where({id: args.id})
        //   .then(user => {
        //     return user
        //   })
      }
    },

    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return UsersController.index();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
