import { NextFunction, Request, Response } from 'express';

import { ChatRoomModel } from '../models/ChatRoom';

export const checkIfUserIsInRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { chatRoomId } = req.params;
    const { userId } = req as Request & { userId: string };

    try {
      const chatRoom = await ChatRoomModel.findById(chatRoomId);

      if (!chatRoom) {
        return res.status(400).json({ success: false, message: 'Chat room not found' });
      }

      const userIsInRoom = chatRoom.users.includes(userId);

      if (!userIsInRoom) {
        return res.status(400).json({ success: false, message: 'User is not in chat room' });
      }

      next();
    } catch (e) {
      return res.status(500).json({ success: false, error: e });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
