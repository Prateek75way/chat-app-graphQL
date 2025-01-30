// app/graphql/schema.js
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    online: Boolean!
  }

  type Message {
    id: ID!
    sender: User!
    receiver: User!
    content: String
    media: String
    status: String!
    createdAt: String!
  }

  type Query {
    users: [User ]
    messages(senderId: ID!, receiverId: ID!): [Message]
  }

  type Mutation {
    signup(username: String!, password: String!): User
    login(username: String!, password: String!): String
    sendMessage(receiverId: ID!, content: String, media: String): Message
  }

  type Subscription {
    messageSent(receiverId: ID!): Message
  }
`;

export default typeDefs;