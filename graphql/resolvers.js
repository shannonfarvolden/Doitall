import { Query as userQuery }from './user/resolvers';
import { Query as groupQuery } from './group/resolvers';

export default {
  Query: {
    ...userQuery,
    ...groupQuery
  }
};
