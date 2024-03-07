import { Schema, model } from 'mongoose';

import { UserDocumentInterface } from './interfaces';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const UserModel = model<UserDocumentInterface>('User', UserSchema);
