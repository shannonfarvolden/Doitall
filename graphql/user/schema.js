import Base from '../base';

const User = `
directive @isAuthenticated on QUERY | FIELD

extend type Query {
  User(id: ID!): User
  Users: [User] @isAuthenticated
}
extend type Mutation {
    createUser (email: String!, username: String!, password: String!): String
    login (username: String!, password: String!): String
}
type User {
  id: ID
  email: String
  username: String
  password: String
}
`;

export default () => [Base, User];
