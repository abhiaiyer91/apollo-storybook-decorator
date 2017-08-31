# Apollo Storybook Decorator

Wrap your React Storybook stories with Apollo Client.

### The Gist

* Provide GraphQL type definitions to the decorator.
* Provide a Mock object like you would with `graphql-tools` http://dev.apollodata.com/tools/graphql-tools/mocking.html
* Optionally pass other redux reducers to take advantage of Redux UI state with Apollo Client


### Getting Started

```sh
yarn add apollo-storybook-decorator -D

npm install apollo-storybook-decorator --save-dev
```

The Decorator:

```js
type DecoratorType = {
  //string representing your graphql schema, if you use tools like `babel-plugin-inline-import` you can import this from a  .graphql file
  typeDefs: string | Array<string>,
  // object that resolves the keys of your graphql schema
  mocks: Object,
  // optional reducers to add other redux libraries or your own reducers
  reducers?: Object,
  // optional redux middlewares to be applied during creation of the redux store
  reduxMiddlewares?: Array<Function> | ({ apolloClient }: MiddlewaresType) => Array<Function>,
  // optional apollo client constructor options
  apolloClientOptions?: Object,
  // optional typeResolvers for complex mocking
  typeResolvers?: Object,
  // optional context 
  context?: Object,
  // optional root value
  rootValue?: Object,
}
```

### Usage

You can add the decorator at a per story basis:

```js
storiesOf('Apollo Client', module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  )
```

or you can add it to all stories, head to your storybook `config.js`

```js
import { configure, addDecorator } from '@storybook/react';
import apolloStorybookDecorator from 'apollo-storybook-decorator';
import typeDefs from '../wherever/your/typeDefs/live';
import mocks from '../wherever/your/mocks/live';

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks
  })
);

function loadStories() {
  // stories...
}

configure(loadStories, module);
```


### Quick Example

```js
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { storiesOf } from '@storybook/react';
import apolloStorybookDecorator from 'apollo-storybook-decorator';

const typeDefs = `
  type Query {
    helloWorld: String
  }

  schema {
    query: Query
  }
`;

const mocks = {
  Query: () => {
    return {
      helloWorld: () => {
        return 'Hello from Apollo!!';
      },
    };
  },
};

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
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  )
  .add('Hello World Test', () => {
    return <HelloWorld />;
  });
```

### Development

To get started, clone this repo and run the following command:

```bash
$ yarn # install node deps
```

To run the project's examples, run:

```bash
$ yarn storybook # for storybook testing
```
