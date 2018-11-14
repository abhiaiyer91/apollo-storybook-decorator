import createClient from 'apollo-storybook-core';
import VueApollo from 'vue-apollo';

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
  Vue,
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

  // Install the vue plugin
  Vue.use(VueApollo);

  const apolloProvider = new VueApollo({
    defaultClient: graphqlClient,
  });

  return function VueStory() {
    return {
      apolloProvider,
      template: `
      <div>
          <story/>
      </div>
    `,
    };
  };
}
