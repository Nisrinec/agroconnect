const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) return null;
      return await User.findById(user.id);
    },

    // Admin-only: Get all users
    users: async (_, __, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Access denied');
      }
      return await User.find();
    },
  },

  Mutation: {
    // Accept role optionally during registration
    register: async (_, { username, email, password, role }, { JWT_SECRET }) => {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: role || 'buyer', // Default to buyer if role not provided
      });

      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return token;
    },

    login: async (_, { username, password }, { JWT_SECRET }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return token;
    },

    updateUserRole: async (_, { id, role }, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Access denied');
      }

      return await User.findByIdAndUpdate(id, { role }, { new: true });
    },

    deleteUser: async (_, { id }, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Access denied');
      }

      await User.findByIdAndDelete(id);
      return 'User deleted';
    },
  },
};

module.exports = resolvers;
