const Product = require('./models/Product');

const resolvers = {
  Query: {
    products: async () => await Product.find(),
    product: async (_, { id }) => await Product.findById(id),
  },
  Mutation: {
    createProduct: async (_, { name, description, price }) => {
      const product = new Product({ name, description, price });
      return await product.save();
    },
  },
};

module.exports = resolvers;
