import Base from '../base';

const Group = `
extend type Query {
  Group(id: ID!): Group
  Groups: [Group]
}
type Group {
  id: ID
  title: String
  description: String
  category: String
  public: Boolean
  size_limit: Int
}
`;

export default () => [Base, Group];