const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) return null;
      return await User.findById(user.id);
    },
  },

  Mutation: {
    register: async (_, { username, email, password }, { JWT_SECRET }) => {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, username: newUser.username, email: newUser.email },
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
        { id: user._id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return token;
    },
  },
};

module.exports = resolvers;
