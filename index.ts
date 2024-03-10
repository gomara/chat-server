/* eslint-disable no-console */
import express from 'express';
import { Server } from 'socket.io';

import chatRoomRouter from './routes/chatRoom';
import authRouter from './routes/auth';
import { dbConnect } from './db/mongodb';
import { decode } from './middleware/jwt';
import { getUserChatRoom } from './services/chatRoomService';
import { handleDisconnect, handleMessage, joinRoom, leaveRoom } from './services/socketService';

const PORT = process.env.PORT || 3500;

const serverConnect = async (): Promise<void> => {
  await dbConnect();
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/auth', authRouter);
  app.use('/rooms', decode, chatRoomRouter);

  const expressServer = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });

  const io = new Server(expressServer, {
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? false
          : ['http://localhost:5500', 'http://127.0.0.1:5500'], //vscode live server
    },
  });

  io.on('connection', (socket) => {
    socket.emit('message', 'Welcome to the chat server!');

    socket.on('joinRoom', async ({ roomId, username }) => {
      //leave previous room if the user was in other
      const previousRoom = await getUserChatRoom(username);
      const previousRoomId = previousRoom ? previousRoom._id.toString() : null;

      if (previousRoomId && previousRoomId !== roomId) {
        await leaveRoom(socket, username, previousRoom, io);

        await joinRoom(socket, username, roomId);
      } else if (previousRoom && previousRoomId === roomId) {
        socket.emit('message', `You are already in the ${roomId} chat room`);
      } else {
        await joinRoom(socket, username, roomId);
      }
    });

    socket.on('message', async ({ username, message, roomId }) => {
      await handleMessage(io, username, message, roomId);
    });

    // To all users except the user who connected
    socket.on('disconnect', async () => {
      await handleDisconnect(socket);
    });
  });
};

serverConnect().catch((e) => {
  console.log('Error', e);
});
