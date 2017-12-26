import React from 'react';
import { ApolloProvider } from 'react-apollo';
import createClient from 'apollo-storybook-core';

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
  const graphqlClient = createClient({
    mocks,
    apolloLinkOptions,
    apolloClientOptions,
    typeResolvers,
    typeDefs,
    rootValue,
    context,
    cacheOptions,
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
