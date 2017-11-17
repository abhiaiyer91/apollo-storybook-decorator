import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  addResolveFunctionsToSchema,
} from 'graphql-tools';
import { graphql, print } from 'graphql';
import { InMemoryCache } from 'apollo-cache-inmemory'; // eslint-disable-line
import { ApolloLink, Observable } from 'apollo-link';


// next 2 funx adapted from
// https://github.com/apollographql/react-apollo-error-template/blob/b1c8e690ddec5d6a0f2723c2a705ff6913566ee4/src/graphql/link.js
// which was given as an example in response to
// https://github.com/apollographql/apollo-client/issues/2497#event-1339022890

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const mklink = (schema, rootValue = {}, context = {}) => {
  return new ApolloLink((operation) => {
    return new Observable((observer) => {
      const { query, operationName, variables } = operation;
      delay(300) // TBH I have no idea why add a delay here. Revise?
        .then(() => { return graphql(schema, print(query), rootValue, context, variables, operationName); })
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch(observer.error.bind(observer));
    });
  });
};

export default function initializeApollo({
  typeDefs,
  mocks,
  apolloClientOptions = {},
  typeResolvers,
  context = {},
  rootValue = {},
   // cacheOptions is a necessary config parameter because some use cases will require a pre-configured
   // fragmentMatcher such as IntrospectionFragmentMatcher, etc.
  cacheOptions = {},
}) {
  const schema = makeExecutableSchema({ typeDefs });

  if (!!mocks) {
    addMockFunctionsToSchema({
      schema,
      mocks,
    });
  }

  if (!!typeResolvers) {
    addResolveFunctionsToSchema(schema, typeResolvers);
  }

  const graphqlClient = new ApolloClient({
    addTypename: true,
    cache: new InMemoryCache(cacheOptions),
    link: mklink(schema, rootValue, context),
    connectToDevTools: true,
    ...apolloClientOptions,
  });

  function StorybookProvider({ children }) {
    return (
      <ApolloProvider client={graphqlClient}>
        <div>
          {children}
        </div>
      </ApolloProvider>
    );
  }

  return (story) => {
    return (
      <StorybookProvider>
        {story()}
      </StorybookProvider>
    );
  };
}

