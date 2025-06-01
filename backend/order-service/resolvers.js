const Order = require('./models/Order');
const { sendOrderNotification } = require('./kafka/producer');

const resolvers = {
  Query: {
    orders: async () => await Order.find(),
    order: async (_, { id }) => await Order.findById(id),
  },
  Mutation: {
    createOrder: async (_, { productId, quantity, total }) => {
      const order = new Order({ productId, quantity, total });
      await order.save();

      const message = {
        event: 'ORDER_CREATED',
        data: { orderId: order.id, productId, quantity, total },
      };

      await sendOrderNotification(message); // ✅ Make sure this function exists in producer.js

      return order;
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
