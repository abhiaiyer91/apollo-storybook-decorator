import React from 'react';
import { action } from '@storybook/addon-actions';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { makeExecutableSchema, addMockFunctionsToSchema, addResolveFunctionsToSchema } from 'graphql-tools';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { createLogger } from 'redux-logger';

/**
 * Log redux actions to Storybook
 * @type {Object}
 */
const storybookReduxLogger = {
  ...console,
  log(...args) {
    console.log(...args); // eslint-disable-line no-console
    const [, , lastItem] = args;
    if (lastItem && lastItem.type) {
      action(`${lastItem.type}`)(lastItem);
    }
  },
};

export default function initializeApollo({
  typeDefs,
  mocks,
  reducers = {},
  reduxMiddlewares = [],
  apolloClientOptions = {},
  typeResolvers,
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
    networkInterface: mockNetworkInterfaceWithSchema({ schema }),
    connectToDevTools: true,
    ...apolloClientOptions,
  });

  const logger = createLogger({
    logger: storybookReduxLogger,
  });

  const reducer = combineReducers({
    apollo: graphqlClient.reducer(),
    ...reducers,
  });

  const store = createStore(
    reducer,
    applyMiddleware(logger, graphqlClient.middleware(), ...reduxMiddlewares)
  );

  function StorybookProvider({ children }) {
    return (
      <ApolloProvider store={store} client={graphqlClient}>
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
