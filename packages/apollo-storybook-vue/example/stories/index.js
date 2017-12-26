import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import gql from 'graphql-tag';
import HelloWorld from './HelloWorld.vue';

const sampleQuery = gql`
  query hello {
    helloWorld
  }
`;

storiesOf('Apollo Client', module).add('Hello World Test', () => {
  return {
    components: { HelloWorld },
    template: '<helloWorld  />',
    apollo: {
      helloWorld: sampleQuery,
    },
  };
});
