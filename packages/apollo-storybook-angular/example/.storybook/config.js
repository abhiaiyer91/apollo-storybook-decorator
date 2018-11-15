import { configure, addDecorator } from '@storybook/angular';
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
  require('../stories/index.ts');
}

configure(loadStories, module);
