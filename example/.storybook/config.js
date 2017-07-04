import { configure, addDecorator } from '@storybook/react';
import apolloStorybookDecorator from '../../src';
import typeDefs from '../schema/typeDefinitions';
import mocks from '../schema/mocks';

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks
  })
);

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);
