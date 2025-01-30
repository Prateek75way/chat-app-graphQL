// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      username
      online
    }
  }
`;

export const MESSAGES_QUERY = gql`
  query Messages($senderId: ID!, $receiverId: ID!) {
    messages(senderId: $senderId, receiverId: $receiverId) {
      id
      sender {
        id
        username
      }
      receiver {
        id
        username
      }
      content
      media
      status
      createdAt
    }
  }
`;

export const MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription MessageSent($receiverId: ID!) {
    messageSent(receiverId: $receiverId) {
      id
      sender {
        id
        username
      }
      receiver {
        id
        username
      }
      content
      media
      status
      createdAt
    }
  }
`;