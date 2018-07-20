# Apollo Storybook Decorator

<p align="center">
  <img width="200" height="200" src="apollo-storybook-decorator.png" alt="logo">
</p>

<p align="center">
  Wrap your React Storybook stories with Apollo Client.
</p>

## Supports

### React (Apollo Client V2)

<p>
  <a href="https://www.npmjs.com/package/apollo-storybook-react">
    <img src="https://img.shields.io/npm/dt/apollo-storybook-react.svg" alt="Npm download">
  </a>
</p>

### React (Apollo Client V1)

<p>
  <a href="https://www.npmjs.com/package/apollo-storybook-decorator">
    <img src="https://img.shields.io/npm/dt/apollo-storybook-decorator.svg" alt="Npm download">
  </a>
</p>

### React Native (Apollo Client V2)

<p>
  <a href="https://www.npmjs.com/package/apollo-storybook-react-native">
    <img src="https://img.shields.io/npm/dt/apollo-storybook-react-native.svg" alt="Npm download">
  </a>
</p>

## Coming Soon:

- Vue
- Angular

### The Gist

- Provide GraphQL type definitions to the decorator.
- Provide a Mock object like you would with `graphql-tools` http://dev.apollodata.com/tools/graphql-tools/mocking.html

Take this:

<p align="center">
  <img width="700" height="auto" src="sbook2.png" alt="example1">
</p>

To Render this:
<p align="center">
  <img width="700" height="auto" src="storybook.png" alt="example1Book">
</p>

### Getting Started

For Apollo Client 2.x (React)

```sh
yarn add apollo-storybook-react -D

npm install apollo-storybook-react --save-dev
```

### Full Example

<p align="center">
  <img width="700" height="auto" src="sbook.png" alt="sbookexample">
</p>

### Usage

You can add the decorator at a per story basis:

```js
storiesOf('Apollo Client', module).addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks,
  })
);
```

or you can add it to all stories, head to your storybook `config.js`

```js
import { configure, addDecorator } from '@storybook/react';
import apolloStorybookDecorator from 'apollo-storybook-decorator-react';
import typeDefs from '../wherever/your/typeDefs/live';
import mocks from '../wherever/your/mocks/live';

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks,
  })
);

function loadStories() {
  // stories...
}

configure(loadStories, module);
```

#### Options

```js
type DecoratorType = {
  //string representing your graphql schema, if you use tools like `babel-plugin-inline-import` you can import this from a  .graphql file
  typeDefs: string | Array<string>,
  // object that resolves the keys of your graphql schema
  mocks: Object,
  apolloClientOptions?: Object,
  apolloLinkOptions?: Object,
  // optional typeResolvers for complex mocking
  typeResolvers?: Object,
  // optional context
  context?: Object,
  // optional root value
  rootValue?: Object,
};
```

### Development

This repo is split up using the `lerna` monorepo module.

To get started, clone this repo and run the following command:

```bash
$ yarn # install node deps
```

```bash
$ lerna bootstrap
```

To run the project's examples, run:

Current storybook is enabled in `apollo-storybook-react` and `apollo-storybook-v1`

```bash
$ yarn storybookReact
```

or for v1

```bash
$ yarn storybookV1
```
