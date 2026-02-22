import { mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './userResolvers.js';
import employeeResolvers from './employeeResolvers.js';

const resolvers = mergeResolvers([userResolvers, employeeResolvers]);

export default resolvers;
