import { clearDatabase, closeDatabase, dbTestConnect } from '../../db/dbtest';
import { ChatRoomModel } from '../../models/ChatRoom';
import { UserModel } from '../../models/User';
import { ChatRoomDocumentInterface, UserDocumentInterface } from '../../models/interfaces';
import {
  getChatRoomById,
  getChatRooms,
  getMessagesFromChatRoom,
  getUserChatRoom,
  removeUserFromChatRoom,
  joinUserToChatRoom,
} from '../chatRoomService';
import { createMessage } from '../messageService';

let user: UserDocumentInterface;
let chatRoom: ChatRoomDocumentInterface;
const message = 'hello';

beforeAll(async () => {
  await dbTestConnect();
  user = await UserModel.findOne();
  chatRoom = await ChatRoomModel.findOne();
  await createMessage(message, user.id, chatRoom.id);
});

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe('Chat room services expected behaviour', () => {
  test('getChatRoomById should retrieve correct chatRoom', async () => {
    const findedChatRoom = await getChatRoomById(chatRoom.id);

    expect(findedChatRoom).toBeDefined();
    expect(findedChatRoom.id).toBe(chatRoom.id);
  });
  test('getChatRooms should retrieve correct chatRooms', async () => {
    const findedChatRooms = await getChatRooms();

    expect(findedChatRooms).toBeDefined();
    expect(findedChatRooms.length).toBeGreaterThan(0);
    expect(findedChatRooms).toContainEqual(expect.objectContaining({ id: chatRoom.id }));
  });
  test('joinUserToChatRoom should add user to the chatroom with the socket id', async () => {
    const randomSocketId = 'socket1234';

    await joinUserToChatRoom(null, chatRoom.id, randomSocketId, user.id);
    const updatedChatRoom = await getChatRoomById(chatRoom.id);
    const updatedUser = await UserModel.findById(user.id);

    expect(updatedChatRoom).toBeDefined();
    expect(updatedUser).toBeDefined();
    expect(updatedChatRoom.users).toContainEqual(user.id);
    expect(updatedUser.socketId).toBe(randomSocketId);
  });
  test('getMessagesFromChatRoom should return the correct message', async () => {
    await createMessage(message, user.id, chatRoom.id);
    const messages = await getMessagesFromChatRoom(chatRoom.id);

    expect(messages).toBeDefined();
    expect(messages.length).toBeGreaterThan(0);
    expect(messages).toContainEqual(
      expect.objectContaining({
        message,
        chatRoomId: chatRoom.id,
        postedByUserId: expect.objectContaining({ id: user.id }),
      }),
    );
  });
  test('getUserChatRoom should return the user  chatroom', async () => {
    const chatRoom = await getUserChatRoom(user.username);

    expect(chatRoom).toBeDefined();
    expect(chatRoom.id).toBe(chatRoom.id);
  });
  test('removeUserFromChatRoom should return the user  chatroom', async () => {
    await removeUserFromChatRoom(user.username);
    const updatedChatRoom = await getChatRoomById(chatRoom.id);

    expect(updatedChatRoom).toBeDefined();
    expect(updatedChatRoom.users).not.toContainEqual(user.id);
  });
});
