import { MessageModel } from '../models/Message';

export const createMessage = async (
  message: string,
  postedByUserId: string,
  chatRoomId: string,
) => {
  const newMessage = MessageModel.create({
    message,
    postedByUserId,
    chatRoomId,
  });

  return newMessage;
};
