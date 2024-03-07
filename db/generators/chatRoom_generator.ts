import { ChatRoomModel } from '../../models/ChatRoom';
import { ChatRoomDocumentInterface } from '../../models/interfaces';

import { generateRandomChatRoomName } from './utilities_generator';

export const chatRoomGenerator = async (): Promise<ChatRoomDocumentInterface> => {
  const { name } = generateRandomChatRoomName();
  const newChatRoom = await ChatRoomModel.create({
    name,
    users: [],
  });

  return newChatRoom;
};
