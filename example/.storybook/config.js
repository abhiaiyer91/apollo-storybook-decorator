import { configure, addDecorator } from '@storybook/react'; // eslint-disable
import apolloStorybookDecorator from '../../src';
import typeDefs from '../schema/typeDefinitions';
import mocks from '../schema/mocks';

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks,
  })
);

function loadStories() {
  require('../stories/index.js'); // eslint-disable
}

configure(loadStories, module);
