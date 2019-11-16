const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime
  type Note {
    id: ID!
    content: String!
    author: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type Mutation {
    newNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
  }
  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID): Note!
  }
`;
