import { gql } from '@apollo/client';


export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      id
      username
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

// src/graphql/queries.ts


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
      content
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
      content
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
