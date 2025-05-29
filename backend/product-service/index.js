require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const resolvers = require('./resolvers');

const typeDefs = readFileSync(path.join(__dirname, 'schema.gql'), 'utf8');

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return server.listen();
  })
  .then(({ url }) => {
    console.log(`🚀 Product Service running at ${url}`);
  })
  .catch(err => console.error('❌ Connection error:', err));
