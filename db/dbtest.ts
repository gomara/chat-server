import 'dotenv/config';

import { Server } from 'http';

import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection } from 'mongoose';
import express, { Application } from 'express';

import { decode } from '../middleware/jwt';
import authRouter from '../routes/auth';
import chatRoomRouter from '../routes/chatRoom';

import { seedChatRooms, seedUsers } from './seeder';

let mongod: MongoMemoryServer | undefined;
const PORT = process.env.TEST_PORT || 4000;

export type ServerInfo = {
  app: Application;
  server: Server;
};

export const dbTestConnect = async (): Promise<void> => {
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await connect(uri);
    await seedChatRooms();
    await seedUsers();
  } catch (error) {
    if (mongod != null) await mongod.stop();
    throw new Error('Database ERROR!!!');
  }
};

export const closeDatabase = async (): Promise<void> => {
  if (mongod != null) {
    await connection.dropDatabase();
    await connection.close();
    await mongod.stop({ doCleanup: true });
  }
};

export const clearDatabase = async (): Promise<void> => {
  if (mongod != null) {
    const collections = connection.collections;

    for (const key in collections) {
      const collection = collections[key];

      await collection.deleteMany({});
    }
  }
};

export const testServerConnect = async (): Promise<ServerInfo> => {
  await dbTestConnect();
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/auth', authRouter);
  app.use('/rooms', decode, chatRoomRouter);
  const server = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server is running on port ${PORT}`);
  });

  return { app, server };
};

export const testServerStop = async (): Promise<void> => {
  await clearDatabase();
  await closeDatabase();
};
