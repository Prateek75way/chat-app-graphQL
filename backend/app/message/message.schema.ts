import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  content: { type: String },
  media: { type: String }, // URL to the media file
  status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Message', MessageSchema);