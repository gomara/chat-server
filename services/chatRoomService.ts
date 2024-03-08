import { ChatRoomModel } from '../models/ChatRoom';
import { MessageModel } from '../models/Message';

export const getMessagesFromChatRoom = async (chatRoomId: string) => {
  const messages = await MessageModel.find({ chatRoomId })
    .sort({ createdAt: 1 })
    .populate('postedByUserId')
    .populate({
      path: 'postedByUserId',
      select: 'username',
    });

  return messages;
};

export const getChatRoomById = async (chatRoomId: string) => {
  const chatRoom = await ChatRoomModel.findById(chatRoomId);

  return chatRoom;
};

export const getChatRooms = async () => {
  const chatRooms = await ChatRoomModel.find();

  return chatRooms;
};
