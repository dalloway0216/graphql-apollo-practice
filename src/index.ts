import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

type User = {
  id: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  address: string;
  phone: string;
  birthday: string;
};

const users: User[] = [
  {
    id: '1',
    name: 'Taro',
    email: 'taro@example.com',
    gender: 'male',
    age: 25,
    address: 'Tokyo',
    phone: '090-1111-2222',
    birthday: '1999-01-01',
  },
  {
    id: '2',
    name: 'Hanako',
    email: 'hanako@example.com',
    gender: 'female',
    age: 23,
    address: 'Osaka',
    phone: '090-3333-4444',
    birthday: '2001-05-10',
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
    phone: String!
    birthday: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
  addUser(name: String!, email: String!, gender: String!, age: Int!, address: String!, phone: String!，birthday: string！): User!
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
  args: { name: string; email: string; gender: string; age: number; address: string; phone: string;birthday: string}
) => {
  const newUser: User = {
    id: String(users.length + 1),
    name: args.name,
    email: args.email,
    gender: args.gender,
    age: args.age,
    address: args.address,
    phone: args.phone,
    birthday: args.birthday,
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