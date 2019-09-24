import createClient from 'apollo-storybook-core';
import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';

function getComponentSelector(component) {
  // eslint-disable-next-line no-underscore-dangle
  return component.__annotations__[0].selector;
}

function getTemplate(metadata) {
  let tpl = '';
  if (metadata.component) {
    const selector = getComponentSelector(metadata.component);
    tpl = `<${selector}></${selector}>`;
  }

  if (metadata.template) {
    tpl = metadata.template;
  }

  return `<div>${tpl}</div>`;
}

function getModuleMetadata(clientModule, metadata) {
  const { moduleMetadata, component } = metadata;

  if (component && !moduleMetadata) {
    return {
      declarations: [metadata.component],
      imports: [clientModule],
    };
  }

  if (component && moduleMetadata) {
    return {
      ...moduleMetadata,
      declarations: [...moduleMetadata.declarations, metadata.component],
      imports: [clientModule],
    };
  }

  return moduleMetadata;
}

export default function initializeApollo({
  typeDefs,
  mocks,
  apolloLinkOptions = {},
  apolloClientOptions = {},
  typeResolvers,
  context = {},
  rootValue = {},
  // cacheOptions is a necessary config parameter because some use cases will require a pre-configured
  // fragmentMatcher such as IntrospectionFragmentMatcher, etc.
  cacheOptions = {},
}) {
  const graphqlClient = createClient({
    mocks,
    apolloLinkOptions,
    apolloClientOptions,
    typeResolvers,
    typeDefs,
    rootValue,
    context,
    cacheOptions,
  });

  return function(metadataFn) {
    const metadata = metadataFn();

    @NgModule({
      exports: [ApolloModule],
    })
    class GraphQLModule {
      constructor(apollo: Apollo) {
        // create Apollo
        apollo.setClient(graphqlClient);
      }
    }

    return {
      ...metadata,
      template: getTemplate(metadata),
      moduleMetadata: getModuleMetadata(GraphQLModule, metadata),
    };
  };
}
