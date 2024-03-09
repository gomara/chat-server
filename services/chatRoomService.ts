import { ChatRoomModel } from '../models/ChatRoom';
import { MessageModel } from '../models/Message';

import { associateUserToSocket, getUserByUsername, removeSocketIdFromUser } from './userService';

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

export const getUserChatRoom = async (username: string) => {
  const user = await getUserByUsername(username);

  const chatRoom = await ChatRoomModel.findOne({ users: user._id });

  return chatRoom;
};

export const removeUserFromChatRoom = async (username: string) => {
  const user = await getUserByUsername(username);

  const chatRoom = await ChatRoomModel.findOne({ users: user._id });

  chatRoom.users = chatRoom.users.filter((userId) => userId.toString() !== user._id.toString());

  await chatRoom.save();
  await removeSocketIdFromUser(user._id);
};

export const joinUserToChatRoom = async (
  username: string,
  chatRoomId: string,
  socketId: string | null,
  userIdFromReq: string | null,
) => {
  const userId = userIdFromReq ? userIdFromReq : (await getUserByUsername(username))._id;

  if (socketId) {
    await associateUserToSocket(userId, socketId);
  }
  const chatRoom = await ChatRoomModel.findById(chatRoomId);

  chatRoom.users = Array.from(new Set([...chatRoom.users, userId]));
  await chatRoom.save();
};
