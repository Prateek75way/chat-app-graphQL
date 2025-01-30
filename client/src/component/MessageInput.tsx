import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE_MUTATION } from '../graphql/mutataions';

interface MessageInputProps {
  receiverId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ receiverId }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
    onCompleted: () => {
      setContent('');
      setMedia('');
    },
    onError: (error) => {
      console.error(error);
      // Handle error (e.g., show a message)
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ variables: { receiverId, content, media } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message"
        required
      />
      <input
        type="text"
        value={media}
        onChange={(e) => setMedia(e.target.value)}
        placeholder="Media URL (optional)"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;