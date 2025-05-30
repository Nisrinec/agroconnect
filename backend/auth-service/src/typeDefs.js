const { gql } = require('graphql-tag');

const typeDefs = gql`
  extend type Query {
    me: User
    users: [User!]!
  }

  type User @key(fields: "id") {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, role: String): String!
    login(username: String!, password: String!): String!
    updateUserRole(id: ID!, role: String!): User!
    deleteUser(id: ID!): String!
  }
`;

module.exports = typeDefs;
