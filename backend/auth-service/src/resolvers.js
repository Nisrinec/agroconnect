const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path to your model

module.exports = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await User.findById(user.id);
    },
    users: async () => {
      return await User.find();
    },
  },
  Mutation: {
    register: async (_, { username, email, password, role }) => {
      // implement your logic and return token or message
    },
    login: async (_, { username, password }) => {
      // implement login and return JWT token
    },
    updateUserRole: async (_, { id, role }) => {
      return await User.findByIdAndUpdate(id, { role }, { new: true });
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return "User deleted successfully";
    },
  },
  User: {
    __resolveReference: async ({ id }) => {
      return await User.findById(id);
    },
  },
};
