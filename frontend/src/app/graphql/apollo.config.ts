// src/app/graphql/apollo.config.ts
import { provideApollo } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

export function createApollo(): ApolloClientOptions<any> {
  return {
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  };
}

// ✅ Export the function call with function reference, NOT execution
export const provideApolloClient = provideApollo(createApollo);
