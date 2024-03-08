import { Schema, model } from 'mongoose';

import { MessageDocumentInterface } from './interfaces';

const MessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    postedByUserId: {
      type: String,
      required: true,
      ref: 'User',
    },
    chatRoomId: {
      type: String,
      required: true,
      ref: 'ChatRoom',
    },
  },
  { timestamps: true },
);

export const MessageModel = model<MessageDocumentInterface>('Message', MessageSchema);
