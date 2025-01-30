// src/types.ts
export interface User {
    id: string;
    username: string;
    online: boolean;
  }
  
  export interface Message {
    id: string;
    sender: User;
    receiver: User;
    content?: string;  // Optional to match GraphQL schema
    media?: string;     // Optional to match GraphQL schema
    status: string;
    createdAt: string;
  }
  
  // Optional: You might also want these types for props
  export interface MessageInputProps {
    receiverId: string;
  }
  
  export interface ChatMessage {
    id: string;
    content?: string;
    media?: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
  }