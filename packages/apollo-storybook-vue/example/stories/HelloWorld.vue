<template>
  <div class="apollo">
    <h3>Greetings from Apollo Storybook Decorator</h3>
    <p>
      {{helloWorld}}
    </p>
  </div>
</template>

<script>
import gql from 'graphql-tag';

const sampleQuery = gql`
  query hello {
    helloWorld
  }
`;

  export default {
    data() {
      return {
        // Initialize your apollo data
        helloWorld: 'Loading...',
      };
    },
    apollo: {
      helloWorld: {
        query: sampleQuery,
      },
    },
  }
</script>
