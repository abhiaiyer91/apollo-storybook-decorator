import React from 'react';
import { Query, graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { storiesOf } from '@storybook/react';

let HelloWorld = function HelloWorld({ data }) {
  const hello = data && data.helloWorld;
  if (data && data.loading) {
    return <h1>Loading one second please!</h1>;
  }
  return <h1>{hello}</h1>;
};

const sampleQuery = gql`
  query hello {
    helloWorld
  }
`;

HelloWorld = graphql(sampleQuery)(HelloWorld);

let HelloContext = function HelloContext({ data }) {
  const hello = data && data.helloContext;
  if (data && data.loading) {
    return <h1>Loading one second please!</h1>;
  }
  return <h1>{hello}</h1>;
};

HelloContext = graphql(
  gql`
    query helloContext {
      helloContext
    }
  `
)(HelloContext);

const userQuery = gql`
  query getUser {
    currentUser {
      name
      lastAction {
        message
      }
      avatar
      city
    }
  }
`;

function CurrentUser() {
  return (
    <Query query={userQuery}>
      {({ loading, data }) => {
        const user = data && data.currentUser;
        if (loading) {
          return <h1>Loading one second please!</h1>;
        }
        return (
          <div>
            <img src={user.avatar} />
            <h1>
              {user.name} from {user.city} said "{user.lastAction.message}"{' '}
            </h1>
          </div>
        );
      }}
    </Query>
  );
}

let Counter = function Counter({ data, mutate }) {
  return (
    <div>
      <h1> The count is {data && data.counts} </h1>
      <button
        onClick={function () {
          return mutate({ refetchQueries: ['getCount'] });
        }}
      >
        Click me!
      </button>
    </div>
  );
};

Counter = compose(
  graphql(
    gql`
      mutation add {
        incrementRandomly
      }
    `
  ),
  graphql(
    gql`
      query getCount {
        counts
      }
    `
  )
)(Counter);

storiesOf('Apollo Client', module)
  .add('Hello World Test', () => {
    return <HelloWorld />;
  })
  .add('Hello World Test (using the context)', () => {
    return <HelloContext />;
  })
  .add('Current User', () => {
    return <CurrentUser />;
  })
  .add('Counter', () => {
    return <Counter />;
  });
