import { mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './userResolvers.js';
// import employeeResolvers from './employeeResolvers.js'; // add later

const resolvers = mergeResolvers([userResolvers]);

export default resolvers;
