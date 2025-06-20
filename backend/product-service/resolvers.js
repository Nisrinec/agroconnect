const Product = require('./models/Product');

const resolvers = {
  Query: {
    products: async () => await Product.find(),
    product: async (_, { id }) => await Product.findById(id),
  },
  Mutation: {
    createProduct: async (_, { name, description, price }) => {
      const newProduct = new Product({ name, description, price });
      return await newProduct.save();
    },
    updateProduct: async (_, { id, name, description, price }) => {
      return await Product.findByIdAndUpdate(
        id,
        { name, description, price },
        { new: true }
      );
    },
    deleteProduct: async (_, { id }) => {
      const result = await Product.findByIdAndDelete(id);
      return result ? true : false;
    },
  },
};

module.exports = resolvers;
