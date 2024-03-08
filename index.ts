/* eslint-disable no-console */
import path from 'path';

import express from 'express';
import { Server } from 'socket.io';

import chatRoomRouter from './routes/chatRoom';
import { dbConnect } from './db/mongodb';

const PORT = process.env.PORT || 3500;

const serverConnect = async (): Promise<void> => {
  await dbConnect();
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/rooms', chatRoomRouter);

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
    console.log(`User ${socket.id} connected`);
    // Only to the user who connected
    socket.emit('message', 'Welcome to the chat room');
    // To all users except the user who connected
    socket.broadcast.emit('message', `User ${socket.id} connected`);

    // To all users except the user who connected
    socket.on('disconnect', () => {
      socket.broadcast.emit('message', `User ${socket.id} disconnected`);
    });

    socket.on('message', (data) => {
      console.log(data);
      io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
    });
  });
};

serverConnect().catch((e) => {
  console.log('Error', e);
});
