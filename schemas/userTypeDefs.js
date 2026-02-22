import gql from 'graphql-tag';

const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    created_at: String
    updated_at: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User!
  }

  type Query {
    login(usernameOrEmail: String!, password: String!): AuthPayload!
  }
`;

export default userTypeDefs;
