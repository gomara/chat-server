import { ChatRoomModel } from '../models/ChatRoom';
import { UserModel } from '../models/User';

import { chatRoomGenerator } from './generators/chatRoom_generator';
import { userGenerator } from './generators/user_generator';

export const seedUsers = async (userNumber = 1): Promise<void> => {
  await UserModel.deleteMany();

  for (let i = 0; i < userNumber; i++) {
    await userGenerator();
  }
};

export const seedChatRooms = async (chatRoomNumber = 1): Promise<void> => {
  await ChatRoomModel.deleteMany();

  for (let i = 0; i < chatRoomNumber; i++) {
    await chatRoomGenerator();
  }
};
