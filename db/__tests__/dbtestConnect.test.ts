import mongoose from 'mongoose';

import { ServerInfo, dbTestConnect, testServerConnect, testServerStop } from '../dbtest';
import { UserModel } from '../../models/User';
import { ChatRoomModel } from '../../models/ChatRoom';

let serverInfo: ServerInfo | undefined;

describe('dbTestConnect expected connection', () => {
  beforeAll(async () => {
    serverInfo = await testServerConnect();
  });

  afterAll(async () => {
    await testServerStop();
    if (serverInfo) serverInfo.server.close();
  });
  test('should connecto to memory data base and seed de data', async () => {
    const users = await UserModel.find();

    expect(users.length).toBeGreaterThan(0);

    const chatRooms = await ChatRoomModel.find();

    expect(chatRooms.length).toBeGreaterThan(0);
  });
});

describe('dbTestConnect error', () => {
  test('shoud thow an error on conection and expect Database ERROR!!!', async () => {
    jest.spyOn(mongoose, 'connect').mockImplementationOnce(() => {
      throw new Error('Database ERROR!!!');
    });
    await expect(dbTestConnect()).rejects.toThrow('Database ERROR!!!');
  });
});
