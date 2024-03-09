import { MessageModel } from '../models/Message';
import {
  getChatRoomById,
  getChatRooms,
  getMessagesFromChatRoom,
} from '../services/chatRoomService';
import { joinUserToChatRoom } from '../services/chatRoomService';
import { createMessage } from '../services/messageService';

export const getMessagesByRoomId = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const chatRoom = await getChatRoomById(chatRoomId);

    if (!chatRoom) {
      return res.status(400).json({ success: false, message: 'Chat room not found' });
    }
    const messages = await getMessagesFromChatRoom(chatRoomId);

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

export const getAllAvaliableRooms = async (req, res) => {
  try {
    const chatRooms = await getChatRooms();

    return res.status(200).json({ success: true, rooms: chatRooms });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

export const postMessage = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const chatRoom = await getChatRoomById(chatRoomId);

    if (!chatRoom) {
      return res.status(400).json({ success: false, message: 'Chat room not found' });
    }
    const userId = req.userId;

    try {
      const createdMessage = await createMessage(message, userId, chatRoomId);

      return res.status(200).json({ success: true, createdMessage });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    await MessageModel.findByIdAndDelete(messageId);

    return res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

export const joinToChatRoomPost = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const userId = req.userId;

    try {
      await joinUserToChatRoom(null, chatRoomId, null, userId);

      return res
        .status(200)
        .json({ success: true, message: `Succesfully joined to the chat room ${chatRoomId}` });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
