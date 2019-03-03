import Base from '../base';

const User = `
directive @isAuthenticated on QUERY | FIELD
directive @hasRole(role: String) on FIELD | FIELD_DEFINITION

extend type Query {
  User(id: ID!): User
  Users: [User] @hasRole(role: "admin")
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
  role: String
}
`;

export default () => [Base, User];
