const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

// mock data
let notes = [
  {
    id: '1',
    content: 'This is a note',
    author: 'Alex Alegre',
  },
  {
    id: '2',
    content: 'This is another note',
    author: 'Adam Scott',
  },
  {
    id: '3',
    content: 'Hey look! Another note!',
    author: 'James Dean',
  },
];

// describe the data
const typeDefs = gql`
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

// method to get the described date
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: notes.length + 1,
        content: args.content,
        author: 'Adam Scott',
      };
      notes.push(noteValue);
      return noteValue;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}${server.graphqlPath}`);
});
