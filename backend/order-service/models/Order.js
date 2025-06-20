const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  total: Number,
});

module.exports = mongoose.model('Order', orderSchema);
