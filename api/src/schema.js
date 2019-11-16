const { gql } = require('apollo-server-express');

module.exports = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID): Note!
  }
`;
