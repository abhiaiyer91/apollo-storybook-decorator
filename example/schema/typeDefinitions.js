export default `
  type LastAction {
    time: Float
    message: String
  }

  type User {
    submittedAt: Float
    lastAction: LastAction
    name: String
    avatar: String
    city: String
  }

  type Query {
    helloWorld: String
    helloContext: String
    currentUser: User
    counts: Int
  }

  type Mutation {
    incrementRandomly: Int
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
