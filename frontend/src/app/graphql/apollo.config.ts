import { provideApollo } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

export function createApollo(): ApolloClientOptions<any> {
  return {
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
  };
}

export const provideApolloClient = provideApollo(createApollo);
