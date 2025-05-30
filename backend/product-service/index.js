require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { readFileSync } = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const { gql } = require('graphql-tag');
const resolvers = require('./resolvers');
const { buildSubgraphSchema } = require('@apollo/subgraph'); // ✅ IMPORTANT

const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8')
);

async function startServer() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI);

  console.log('✅ Connected to MongoDB');

  // Create Apollo Server as a Subgraph
  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]), // ✅ Federation schema
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }, // ✅ Ensure this matches what the gateway expects
  });

  console.log(`🚀 Product subgraph ready at ${url}`);
}

startServer().catch(err => {
  console.error('❌ Failed to start server:', err);
});
