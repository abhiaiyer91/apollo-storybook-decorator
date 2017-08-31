import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { storiesOf } from '@storybook/react';

let HelloWorld = function HelloWorld({ data }) {
  const hello = data && data.helloWorld;
  if (data && data.loading) {
    return <h1>Loading one second please!</h1>;
  }
  return (
    <h1>
      {hello}
    </h1>
  );
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
  return (
    <h1>
      {hello}
    </h1>
  );
};

HelloContext = graphql(
  gql`
    query helloContext {
      helloContext
    }
  `
)(HelloContext);

let CurrentUser = function CurrentUser({ data }) {
  const user = data && data.currentUser;
  if (data && data.loading) {
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
};

CurrentUser = graphql(
  gql`
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
  `
)(CurrentUser);

let Counter = function Counter({ data, mutate }) {
  return (
    <div>
      <h1>
        {' '}The count is {data && data.counts}{' '}
      </h1>
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
  })
  .add('Redux Thunk Example', () => {
    function helloWorldThunk() {
      return (dispatch, getState, { apolloClient }) => {
        apolloClient.query({
          query: sampleQuery
        }).then((data) => {
          alert(data.data.helloWorld);
        }).catch((e) => {
          console.error(e);
        })
      };
    }

    let HelloWorld = function Hello({ dispatch }) {
      return <button onClick={function () { dispatch(helloWorldThunk());}}>alert me</button>;
    };

    HelloWorld = connect()(HelloWorld);

    return <HelloWorld />;
  });
