const { ApolloServer } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'auth', url: 'http://localhost:4001/graphql' },
      { name: 'product', url: 'http://localhost:4000/graphql' },
      { name: 'order', url: 'http://localhost:4002/graphql' },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
