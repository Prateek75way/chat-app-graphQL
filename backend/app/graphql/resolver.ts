import User from '../user/user.schema'; // Adjust the path as necessary
import Message from '../message/message.schema'; // Adjust the path as necessary
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';

interface SignupArgs {
  username: string;
  password: string;
}

interface LoginArgs {
  username: string;
  password: string;
}

interface SendMessageArgs {
  receiverId: string;
  content?: string;
  media?: string;
}

interface Context {
  userId?: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    messages: async (_: any, { senderId, receiverId }: { senderId: string; receiverId: string }) => {
      return await Message.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId },
        ],
      }).populate('sender receiver');
    },
  },
  Mutation: {
    signup: async (_: any, { username, password }: SignupArgs) => {
      
      const user = new User({ username, password });
      await user.save();
      return user;
    },
    login: async (_: any, { username, password }: LoginArgs): Promise<string> => {
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      return jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
    },
    sendMessage: async (_: any, { receiverId, content, media }: SendMessageArgs, { userId }: Context)=> {
      if (!userId) {
        throw new Error('Unauthorized');
      }
      const message = new Message({ sender: userId, receiver: receiverId, content, media });
      await message.save();
      pubsub.publish(MESSAGE_SENT, { messageSent: message, receiverId });
      return message;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: (_: any, { receiverId }: { receiverId: string }) => pubsub.asyncIterableIterator([MESSAGE_SENT]),
    },
  },
};

export default resolvers;