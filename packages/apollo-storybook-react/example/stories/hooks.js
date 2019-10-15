import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { storiesOf } from '@storybook/react';

const sampleQuery = gql`
  query hello {
    helloWorld
  }
`;

function HelloWorld() {
  const { loading, data } = useQuery(sampleQuery);
  const hello = data && data.helloWorld;
  if (loading) {
    return <h1>Loading one second please!</h1>;
  }
  return <h1>{hello}</h1>;
}

const contextQuery = gql`
    query helloContext {
        helloContext
    }
`;

function HelloContext() {
  const { loading, data } = useQuery(contextQuery);
  const hello = data && data.helloContext;
  if (loading) {
    return <h1>Loading one second please!</h1>;
  }
  return <h1>{hello}</h1>;
}

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
  const { loading, data } = useQuery(userQuery);
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
}

const counterQuery = gql`  
    query getCount {
        counts
    }
`;

const counterMutation = gql`
    mutation add {
        incrementRandomly
    }
`;

function Counter() {
  const [mutate] = useMutation(counterMutation);
  const { data } = useQuery(counterQuery);
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
}

storiesOf('Apollo Hooks', module)
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
