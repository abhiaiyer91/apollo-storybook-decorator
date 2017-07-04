import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { storiesOf } from '@storybook/react';

let HelloWorld = function HelloWorld({ data }) {
  const hello = data && data.helloWorld;
  if (data && data.loading) {
    return <h1>Loading one second please!</h1>
  }
  return <h1>{hello}</h1>
};

HelloWorld = graphql(
  gql`
    query hello {
      helloWorld
    }
  `,
)(HelloWorld);

storiesOf('Apollo Client', module)
  .add('Hello World Test', () => {
    return <HelloWorld />;
  });
