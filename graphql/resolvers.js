import { Query as userQuery, Mutation as userMutation} from './user/resolvers';
import { Query as groupQuery } from './group/resolvers';

export default {
  Query: {
    ...userQuery,
    ...groupQuery
  },
  Mutation: {
    ...userMutation
  }
};
