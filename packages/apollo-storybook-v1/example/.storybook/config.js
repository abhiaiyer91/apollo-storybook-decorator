import { configure, addDecorator } from '@storybook/react';
import ReduxThunk from 'redux-thunk';
import apolloStorybookDecorator from '../../src';
import typeDefs from '../schema/typeDefinitions';
import mocks from '../schema/mocks';

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks,
    context: { value: 'Hello from the resolver context!' },
    reduxMiddlewares: ({ apolloClient }) => {
      return [ReduxThunk.withExtraArgument({ apolloClient })];
    }
  })
);

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);
