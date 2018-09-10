// import { makeExecutableSchema } from 'graphql-tools';
// import User from './user/schema';
// import resolvers from './resolvers';
//
// export default makeExecutableSchema({
//     typeDefs: [User],
//     resolvers,
//     logger: { log: e => console.log(e) },
// });


const User = `
extend type UserQuery {
  User(id: ID!): User
  Users: [User]
}
type User {
  id: ID
  email: String
  username: String
  password: String
  confirmPassword: String
}

`;

module.exports = User;
