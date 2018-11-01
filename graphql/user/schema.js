import Base from '../base';

const User = `
extend type Query {
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

export default () => [Base, User];