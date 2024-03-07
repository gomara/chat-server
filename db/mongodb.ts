/* eslint-disable no-console */
import { connect, connection } from 'mongoose';

import 'dotenv/config';
import { seedChatRooms, seedUsers } from './seeder';

const seedData = async (): Promise<void> => {
  await seedUsers();
  await seedChatRooms();
};

const hasCollections = async (): Promise<boolean> => {
  const collections = await connection.db.listCollections().toArray();

  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    const count = await connection.db.collection(collection.name).findOne({});

    if (count !== null) {
      return true;
    }
  }

  return false;
};

export const dbConnect = async (): Promise<void> => {
  const ENV = process.env.NODE_ENV as string;
  const DB_URL = process.env.DATABASE_MONGODB_LOCAL as string;

  const dbName = ENV === 'production' ? 'chat-prod' : 'chat-local';

  await connect(DB_URL, { dbName })
    .then(() => {
      console.log('🚀 Database connected');
    })
    .catch((err) => {
      console.log('Database ERROR!!!', err);
    });
  if (ENV === 'development') {
    if (!(await hasCollections())) {
      console.log('Creating database...');
      await seedData();
      console.log('🚀 Database created');
    }
  }
};
