import { NgModule } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
})
export class GraphQLModule {}

export function createApollo(httpLink: HttpLink) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink.create({
      uri: 'http://localhost:4002/graphql', // or your gateway
    }),
  });
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
