require('dotenv').config(); // Load env variables at the top

const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const typeDefs = readFileSync(path.join(__dirname, 'schema.gql'), 'utf8');
const resolvers = require('./resolvers');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Decode user from JWT
const getUserFromToken = (token) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

// Connect to MongoDB first
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');

  // Start Apollo Server after DB connects
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      const user = getUserFromToken(token.replace('Bearer ', ''));
      return { user, JWT_SECRET };
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });

})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
