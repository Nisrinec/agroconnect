const Order = require('./models/Order');

const resolvers = {
  Query: {
    orders: async () => await Order.find(),
    order: async(_, { id }) => await Order.findById(id),
  },
  Mutation: {
    createOrder: async (_, { productId, quantity, total }) => {
      const order = new Order({ productId, quantity, total });
      return await order.save();
    },
    updateOrder: async (_, { id, quantity, total }) => {
      return await Order.findByIdAndUpdate(id, { quantity, total }, { new: true });
    },
    deleteOrder: async (_, { id }) => {
      await Order.findByIdAndDelete(id);
      return 'Order deleted';
    },
  },
};

module.exports = resolvers;
