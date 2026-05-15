import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

type User = {
  id: string;
  name: string;
  email: string;
  gender: string;
};

const users: User[] = [
  {
    id: '1',
    name: 'Taro',
    email: 'taro@example.com',
    gender: 'male',
  },
  {
    id: '2',
    name: 'Hanako',
    email: 'hanako@example.com',
    gender: 'female',
  },
];

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    gender: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
  addUser(name: String!, email: String!, gender: String!): User!
}
`;

const resolvers = {
  Query: {
    users: () => users,

    user: (_parent: unknown, args: { id: string }) => {
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