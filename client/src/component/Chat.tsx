import React, { useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { USERS_QUERY, MESSAGES_QUERY, MESSAGE_SENT_SUBSCRIPTION } from '../graphql/queries';
import { Message } from '../types';

const Chat: React.FC = () => {
  const { data: usersData } = useQuery(USERS_QUERY);
  const { data: messagesData, refetch } = useQuery(MESSAGES_QUERY, {
    variables: { senderId: 'currentUser Id', receiverId: 'selectedUser Id' }, // Replace with actual IDs
  });

  useSubscription(MESSAGE_SENT_SUBSCRIPTION, {
    variables: { receiverId: 'selectedUser Id' }, // Replace with actual ID
    onSubscriptionData: ({ subscriptionData }) => {
      // Update messages list with new message
      refetch();
    },
  });

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <h2>Users</h2>
        {usersData?.users.map((user:any) => (
          <div key={user.id}>{user.username}</div>
        ))}
      </div>
      <div>
        <h2>Messages</h2>
        {messagesData?.messages.map((message: Message) => (
          <div key={message.id}>
            <strong>{message.sender.username}:</strong> {message.content}
          </div>
        ))}
      </div>
      {/* Message input component would go here */}
    </div>
  );
};

export default Chat;