import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { createLogger } from 'redux-logger';

export default function initializeApollo({ typeDefs, mocks, reducers = {} }) {
  const schema = makeExecutableSchema({ typeDefs });
  if (!!mocks) {
    addMockFunctionsToSchema({
      schema,
      mocks,
    });
  }

  const graphqlClient = new ApolloClient({
    addTypename: true,
    networkInterface: mockNetworkInterfaceWithSchema({ schema }),
    connectToDevTools: true,
  });

  const logger = createLogger();

  const reducer = combineReducers({
    apollo: graphqlClient.reducer(),
    ...reducers,
  });

  const store = createStore(reducer, applyMiddleware(logger, graphqlClient.middleware()));

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
    return <StorybookProvider>{story()}</StorybookProvider>;
  };
}
