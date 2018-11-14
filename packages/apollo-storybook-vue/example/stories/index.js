import { storiesOf } from '@storybook/vue';

import HelloWorld from './HelloWorld.vue';

storiesOf('Apollo Client', module).add('Hello World Test', () => {
  return {
    components: { HelloWorld },
    template: '<helloWorld  />',
  };
});
