import { ChatRoomModel } from '../models/ChatRoom';
import { UserModel } from '../models/User';

import { chatRoomGenerator } from './generators/chatRoom_generator';
import { userGenerator, userGeneratorFromEnv } from './generators/user_generator';

export const seedUsers = async (): Promise<void> => {
  await UserModel.deleteMany();
  const userName = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;

  if (!userName || !password) {
    await userGenerator();
  } else {
    await userGeneratorFromEnv({ username: userName, password: password });
  }
};

export const seedChatRooms = async (chatRoomNumber = 1): Promise<void> => {
  await ChatRoomModel.deleteMany();

  for (let i = 0; i < chatRoomNumber; i++) {
    await chatRoomGenerator();
  }
};
