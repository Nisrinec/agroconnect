const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email:    { type: String, unique: true, required: true, unique: true },
  password: { type: String, required: true },
   role: {
    type: String,
    enum: ['buyer', 'farmer', 'admin'],
    default: 'buyer'
  }
});

module.exports = mongoose.model('User', userSchema);
