import { configure, addDecorator } from '@storybook/react'; // eslint-disable
import apolloStorybookDecorator from '../../src';
import typeDefs from '../schema/typeDefinitions';
import mocks from '../schema/mocks';

import { withClientState } from 'apollo-link-state';

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks,
    links: (cache) => {
      const linkState = withClientState({
        cache,
        resolvers: {
          Mutation: {
            updateNetworkStatus: (_, { isConnected }, { cache }) => {
              const data = {
                networkStatus: {
                  __typename: 'NetworkStatus',
                  isConnected
                },
              };
              cache.writeData({ data });
              return null
            },
          },
        }
      });

      return [
        linkState,
      ];
    }
  })
);

function loadStories() {
  require('../stories/index.js'); // eslint-disable
}

configure(loadStories, module);
