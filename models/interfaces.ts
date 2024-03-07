import { Document } from 'mongoose';

export interface UserDocumentInterface extends Document {
  username: string;
  password: string;
}

export interface ChatRoomDocumentInterface extends Document {
  name: string;
  users: string[];
}

export interface MessageDocumentInterface extends Document {
  message: string;
  postedByUserId: string;
  chatRoomId: string;
}
