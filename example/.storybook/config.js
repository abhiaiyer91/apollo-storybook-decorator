import { configure, addDecorator } from '@storybook/react';
import apolloStorybookDecorator from '../../src';
import typeDefs from '../schema/typeDefinitions';
import mocks from '../schema/mocks';

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks,
    context: { value: 'Hello from the resolver context!' }
  })
);

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);
