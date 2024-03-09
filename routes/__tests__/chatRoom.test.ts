import request from 'supertest';

import { ServerInfo, testServerConnect, testServerStop } from '../../db/dbtest';
import { userGenerator } from '../../db/generators/user_generator';
import { ChatRoomModel } from '../../models/ChatRoom';
import { ChatRoomDocumentInterface } from '../../models/interfaces';
import { MessageModel } from '../../models/Message';

let serverInfo: ServerInfo | undefined;
let token: string | undefined;
const userPassword = 'testpassword';
let username: string;
let existingRoom: ChatRoomDocumentInterface;

beforeAll(async () => {
  serverInfo = await testServerConnect();
  const user = await userGenerator({ passwordControlled: userPassword, associateToSocket: false });

  existingRoom = await ChatRoomModel.findOne();

  username = user.username;
  const loginResponse = await request(serverInfo.server)
    .post('/auth/login')
    .send({ username: username, password: userPassword });

  token = loginResponse.body.authorization;
});

afterAll(async () => {
  await testServerStop();
  if (serverInfo) serverInfo.server.close();
});

describe('ChatRoom endpoint test with authorization error ', () => {
  test('Get /rooms with error on authorization', async () => {
    const response = await request(serverInfo.server)
      .get('/rooms')
      .set('Authorization', 'Bearer token');
    const { success } = response.body;

    expect(response.status).toBe(401);
    expect(success).toBe(false);
  });
});

describe('ChatRoom endpoint test expected workflow ', () => {
  test('Get /rooms with success', async () => {
    const response = await request(serverInfo.server)
      .get('/rooms')
      .set('Authorization', `Bearer ${token}`);
    const { success, rooms } = response.body;

    expect(response.status).toBe(200);
    expect(success).toBe(true);
    expect(rooms).toHaveLength(1);
  });
  test('Post /rooms/:id with success', async () => {
    const response = await request(serverInfo.server)
      .post(`/rooms/${existingRoom.id}`)
      .set('Authorization', `Bearer ${token}`);

    const { success, message } = response.body;

    expect(response.status).toBe(200);
    expect(success).toBe(true);
    expect(message).toBe(`Succesfully joined to the chat room ${existingRoom.id}`);
  });
  test('Post /:chatRoomId/message with missing message', async () => {
    const response = await request(serverInfo.server)
      .post(`/rooms/${existingRoom.id}/message`)
      .set('Authorization', `Bearer ${token}`)
      .send({ message: '' });

    const { success, message } = response.body;

    expect(response.status).toBe(400);
    expect(success).toBe(false);
    expect(message).toBe('Message is required');
  });
  test('Post /:chatRoomId/message with missing chat room', async () => {
    const response = await request(serverInfo.server)
      .post(`/rooms/123/message`)
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'hello' });

    const { success } = response.body;

    expect(response.status).toBe(500);
    expect(success).toBe(false);
  });
  test('Post /:chatRoomId/message with success', async () => {
    const response = await request(serverInfo.server)
      .post(`/rooms/${existingRoom.id}/message`)
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'hello' });

    const { success, createdMessage } = response.body;

    expect(response.status).toBe(200);
    expect(success).toBe(true);
    expect(createdMessage).toBeDefined();
    expect(createdMessage.message).toBe('hello');
  });
  test('Get /:chatRoomId with success', async () => {
    const response = await request(serverInfo.server)
      .get(`/rooms/${existingRoom.id}`)
      .set('Authorization', `Bearer ${token}`);
    const { success, messages } = response.body;

    expect(response.status).toBe(200);
    expect(success).toBe(true);
    expect(messages).toBeDefined();
    expect(messages.length).toBeGreaterThan(0);
    expect(messages).toContainEqual(
      expect.objectContaining({
        message: 'hello',
        chatRoomId: existingRoom.id,
        postedByUserId: expect.objectContaining({ username: username }),
      }),
    );
  });
  test('Delete /:messageId with success', async () => {
    const createdMessage = await MessageModel.findOne({ message: 'hello' });
    const response = await request(serverInfo.server)
      .delete(`/rooms/${existingRoom.id}/message/${createdMessage.id}`)
      .set('Authorization', `Bearer ${token}`);

    const { success, message } = response.body;

    expect(response.status).toBe(200);
    expect(success).toBe(true);
    expect(message).toBe('Message deleted successfully');
  });
});
