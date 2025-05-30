const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, role: String): String!
    login(username: String!, password: String!): String!
    updateUserRole(id: ID!, role: String!): User!
    deleteUser(id: ID!): String!
  }
`;

module.exports = typeDefs;
