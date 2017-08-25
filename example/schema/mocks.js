import faker from 'faker';

const baseUserMock = (fields = {}) => {
  return {
    submittedAt: faker.date.past(),
    lastAction: {
      time: faker.date.past(),
      message: faker.hacker.phrase(),
    },
    name: faker.name.findName(),
    avatar: faker.image.avatar(),
    city: faker.address.city(),
    ...fields,
  };
};

export default {
  User: () => {
    return baseUserMock();
  },
  Query: () => {
    return {
      helloWorld: () => {
        return 'Hello from Apollo!!';
      },
      helloContext: (root, args, context) => {
        return context.value;
      },
      allUsers: () => {
        return new MockList(10);
      },
    };
  },
  Mutation: () => {
    return {
      incrementRandomly: () => {
        return faker.random.number();
      },
    };
  },
};
