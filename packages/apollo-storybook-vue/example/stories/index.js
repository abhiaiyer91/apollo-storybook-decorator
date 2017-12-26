import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import gql from 'graphql-tag';
import HelloWorld from './HelloWorld.vue';

const sampleQuery = gql`
  query hello {
    helloWorld
  }
`;
//
//
// let CurrentUser = function CurrentUser({ data }) {
//   const user = data && data.currentUser;
//   if (data && data.loading) {
//     return <h1>Loading one second please!</h1>;
//   }
//   return (
//     <div>
//       <img src={user.avatar} />
//       <h1>
//         {user.name} from {user.city} said "{user.lastAction.message}"{' '}
//       </h1>
//     </div>
//   );
// };
//
// CurrentUser = graphql(
//   gql`
//     query getUser {
//       currentUser {
//         name
//         lastAction {
//           message
//         }
//         avatar
//         city
//       }
//     }
//   `
// )(CurrentUser);
//
// let Counter = function Counter({ data, mutate }) {
//   return (
//     <div>
//       <h1>
//         {' '}The count is {data && data.counts}{' '}
//       </h1>
//       <button
//         onClick={function () {
//           return mutate({ refetchQueries: ['getCount'] });
//         }}
//       >
//         Click me!
//       </button>
//     </div>
//   );
// };

// Counter = compose(
//   graphql(
//     gql`
//       mutation add {
//         incrementRandomly
//       }
//     `
//   ),
//   graphql(
//     gql`
//       query getCount {
//         counts
//       }
//     `
//   )
// )(Counter);

storiesOf('Apollo Client', module).add('Hello World Test', () => {
  return {
    components: { HelloWorld },
    template: '<helloWorld  />',
    apollo: {
      helloWorld: sampleQuery,
    },
  };
});
// .add('Hello World Test (using the context)', () => {
//   return <HelloContext />;
// })
// .add('Current User', () => {
//   return <CurrentUser />;
// })
// .add('Counter', () => {
//   return <Counter />;
// });
