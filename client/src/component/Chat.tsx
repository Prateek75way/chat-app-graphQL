import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { USERS_QUERY, MESSAGES_QUERY, MESSAGE_SENT_SUBSCRIPTION, SEND_MESSAGE_MUTATION } from '../graphql/queries';
import { TextField, Button, Box, Typography, List, ListItem } from '@mui/material';

const Chat: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');

  // Fetch users
  const { data: usersData, loading: usersLoading } = useQuery(USERS_QUERY);

  // Select the first user when users are loaded
  useEffect(() => {
    if (usersData?.users.length > 0 && !selectedUserId) {
      setSelectedUserId(usersData.users[0].id); // Auto-select first user
    }
  }, [usersData, selectedUserId]);

  // Fetch messages between the logged-in user and the selected user
  const { data: messagesData, loading: messagesLoading, refetch } = useQuery(MESSAGES_QUERY, {
    skip: !selectedUserId,
    variables: { senderId: 'my-user-id', receiverId: selectedUserId }, // Replace 'my-user-id' with actual user ID
  });

  // Subscribe to new messages for the selected user
  const { data: newMessageData } = useSubscription(MESSAGE_SENT_SUBSCRIPTION, {
    variables: { receiverId: selectedUserId },
  });

  // Mutation for sending messages
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  useEffect(() => {
    if (newMessageData) {
      // Refetch messages when a new message is received
      refetch();
    }
  }, [newMessageData, refetch]);

  const handleSendMessage = async () => {
    if (selectedUserId && messageContent.trim()) {
      await sendMessage({
        variables: { receiverId: selectedUserId, content: messageContent, media: null },
      });
      setMessageContent('');
    }
  };

  return (
    <Box>
      <Typography variant="h5">Chat</Typography>

      {/* User List */}
      <Box>
        {usersLoading ? (
          <Typography>Loading users...</Typography>
        ) : (
          <List>
            {usersData?.users.map((user: { id: string; username: string }) => (
              <ListItem
                key={user.id}
                button
                onClick={() => setSelectedUserId(user.id)}
                selected={selectedUserId === user.id}
              >
                <Typography>{user.username}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Chat Messages */}
      {selectedUserId && (
        <Box>
          <Typography variant="h6">Messages</Typography>
          {messagesLoading ? (
            <Typography>Loading messages...</Typography>
          ) : (
            <List>
              {messagesData?.messages.map((message: any) => (
                <ListItem key={message.id}>
                  <Typography>
                    <strong>{message.sender.username}: </strong>
                    {message.content}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}

          {/* Message Input */}
          <Box mt={2}>
            <TextField
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              label="Type a message"
              fullWidth
            />
            <Button onClick={handleSendMessage} variant="contained" fullWidth>
              Send
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
