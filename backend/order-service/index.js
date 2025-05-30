const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8');
const resolvers = require('./resolvers');

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect('mongodb://localhost:27017/agroconnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once('open', () => {
    console.log('✅ MongoDB connected');
  });

  app.listen({ port: 4002 }, () =>
    console.log(`🚀 Order service ready at http://localhost:4002${server.graphqlPath}`)
  );
}

startServer();
