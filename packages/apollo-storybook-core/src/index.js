import ApolloClient from 'apollo-client';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  addResolveFunctionsToSchema,
} from 'graphql-tools';
import { graphql, print } from 'graphql';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';

/**
 * Delay for mock latency
 */
function delay(ms) {
  return new Promise(resolve => {
    if (ms === 0) {
      resolve();
    }
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function createLink(schema, rootValue = {}, context = {}, options = {}) {
  let delayMs = 300; // Default
  if (
    Object.prototype.hasOwnProperty.call(options, 'delayMs') &&
    typeof options.delayMs == 'number'
  ) {
    delayMs = options.delayMs;
  }
  return new ApolloLink(operation => {
    return new Observable(observer => {
      const { query, operationName, variables } = operation;
      delay(delayMs)
        .then(() => {
          return graphql(
            schema,
            print(query),
            rootValue,
            context,
            variables,
            operationName,
          );
        })
        .then(result => {
          observer.next(result);
          observer.complete();
        })
        .catch(observer.error.bind(observer));
    });
  });
}

export default function createClient({
  rootValue,
  context,
  typeDefs,
  mocks,
  typeResolvers,
  cacheOptions,
  apolloClientOptions,
  apolloLinkOptions,
  resolverValidationOptions,
  links = () => {
    return [];
  },
}) {
  const schema = makeExecutableSchema({ typeDefs, resolverValidationOptions });

  let mockOptions = {};

  if (!!mocks) {
    mockOptions = {
      schema,
      mocks,
    };

    addMockFunctionsToSchema(mockOptions);
  }

  if (!!typeResolvers) {
    addResolveFunctionsToSchema({ schema, resolvers: typeResolvers });
  }

  const cache = new InMemoryCache(cacheOptions);

  return new ApolloClient({
    addTypename: true,
    cache,
    link: ApolloLink.from([
      ...links(cache),
      createLink(schema, rootValue, context, apolloLinkOptions),
    ]),
    connectToDevTools: true,
    ...apolloClientOptions,
  });
}
