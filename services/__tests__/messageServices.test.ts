import { clearDatabase, closeDatabase, dbTestConnect } from '../../db/dbtest';
import { ChatRoomModel } from '../../models/ChatRoom';
import { UserModel } from '../../models/User';
import { createMessage } from '../messageService';

beforeAll(async () => {
  await dbTestConnect();
});

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe('Message service expected behaviour', () => {
  test('createMessage should create a new valid message', async () => {
    const user = await UserModel.findOne();
    const chatRoom = await ChatRoomModel.findOne();
    const newMessage = await createMessage('hello im cristobal', user.id, chatRoom.id);

    expect(newMessage).toBeDefined();
    expect(newMessage.postedByUserId).toBe(user.id);
    expect(newMessage.chatRoomId).toBe(chatRoom.id);
  });
});
