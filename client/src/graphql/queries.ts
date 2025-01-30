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

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($receiverId: ID!, $content: String, $media: String) {
    sendMessage(receiverId: $receiverId, content: $content, media: $media) {
      id
      sender {
        id
        username
      }
      content
      createdAt
    }
  }
`;
