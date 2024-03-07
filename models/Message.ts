import { Schema, model } from 'mongoose';

import { MessageDocumentInterface } from './interfaces';

const MessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const MessageModel = model<MessageDocumentInterface>('Message', MessageSchema);
