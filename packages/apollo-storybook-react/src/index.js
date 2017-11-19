import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  addResolveFunctionsToSchema,
} from 'graphql-tools';
import { graphql, print } from 'graphql';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';

/**
 * Delay for mock latency
 */
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/**
 * Create an Apollo Link
 */
function createLink(schema, rootValue = {}, context = {}, options = {}) {
  const delayMs = (options && options.delayMs) || 300;
  return new ApolloLink((operation) => {
    return new Observable((observer) => {
      const { query, operationName, variables } = operation;
      delay(delayMs)
        .then(() => {
          return graphql(
            schema,
            print(query),
            rootValue,
            context,
            variables,
            operationName
          );
        })
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch(observer.error.bind(observer));
    });
  });
}

export default function initializeApollo({
  typeDefs,
  mocks,
  apolloLinkOptions = {},
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
    link: createLink(schema, rootValue, context, apolloLinkOptions),
    connectToDevTools: true,
    ...apolloClientOptions,
  });

  function StorybookProvider({ children }) {
    return (
      <ApolloProvider client={graphqlClient}>
        <div>{children}</div>
      </ApolloProvider>
    );
  }

  return (story) => {
    return <StorybookProvider>{story()}</StorybookProvider>;
  };
}
