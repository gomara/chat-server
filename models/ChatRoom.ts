import { Schema, model } from 'mongoose';

import { ChatRoomDocumentInterface } from './interfaces';

const ChatRoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    users: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export const ChatRoomModel = model<ChatRoomDocumentInterface>('ChatRoom', ChatRoomSchema);
