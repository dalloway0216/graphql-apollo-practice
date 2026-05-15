import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

type User = {
  id: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  address: string;
};

const users: User[] = [
  {
    id: '1',
    name: 'Taro',
    email: 'taro@example.com',
    gender: 'male',
    age: 25,
    address: 'Tokyo',
  },
  {
    id: '2',
    name: 'Hanako',
    email: 'hanako@example.com',
    gender: 'female',
    age: 23,
    address: 'Osaka',
  },
];

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    gender: String!
    age: Int!
    address: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
  addUser(name: String!, email: String!, gender: String!, age: Int!, address: String!): User!
}
`;

const resolvers = {
  Query: {
    users: () => users,

    user: (_parent: unknown, args: { name: string; email: string; gender: string; age: number; address: string }) => {
      return users.find((user) => user.id === args.id);
    },
  },

  Mutation: {
   addUser: (
  _parent: unknown,
  args: { name: string; email: string; gender: string }
) => {
  const newUser: User = {
    id: String(users.length + 1),
    name: args.name,
    email: args.email,
    gender: args.gender,
    age: args.age,
    address: args.address,
  };

      users.push(newUser);

      return newUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at: ${url}`);
}

startServer();