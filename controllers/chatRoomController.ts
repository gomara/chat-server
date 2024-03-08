import {
  getChatRoomById,
  getChatRooms,
  getMessagesFromChatRoom,
} from '../services/chatRoomService';

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
