require('dotenv').config(); // Load .env
require('dotenv').config({ path: './.env' }); // Adjusted path


const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

mongoose.connect("mongodb://localhost:27017/agroconnect-auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        console.warn('Invalid token');
      }
    }
    return { user, JWT_SECRET };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Auth service running at ${url}`);
});
