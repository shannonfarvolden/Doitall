import Base from '../base';

const User = `
extend type Query {
  User(id: ID!): User
  Users: [User]
}
extend type Mutation {
    createUser (email: String, username: String, password: String): User
}
type User {
  id: ID
  email: String
  username: String
  password: String
}
`;

export default () => [Base, User];
