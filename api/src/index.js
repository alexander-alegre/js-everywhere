const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// Setup app and db
const app = express();
db.connect(DB_HOST);

// setup Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ models }),
});

// middleware
server.applyMiddleware({ app, path: '/api' });

// TODO: this should render the react app
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}${server.graphqlPath}`);
});
