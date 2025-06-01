const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { connectProducer, sendOrderNotification } = require('./kafka/producer');
const gql = require('graphql-tag'); // ✅ Important
require('dotenv').config();

const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8')); // ✅ Parsed SDL
const resolvers = require('./resolvers');

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,
    }),
  });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect('mongodb://localhost:27017/agroconnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('✅ MongoDB connected');

  // ✅ Move connectProducer here
  await connectProducer();
  console.log('✅ Kafka Producer connected');

  app.listen({ port: 4002 }, () => {
    console.log(`🚀 Order service ready at http://localhost:4002${server.graphqlPath}`);
  });
}

startServer();
