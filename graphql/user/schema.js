const User = `
type Query {
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
