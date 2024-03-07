import path from 'path';

import express from 'express';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
const expressServer = app.listen(PORT, () => {});

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? false
        : ['http://localhost:5500', 'http://127.0.0.1:5500'],
  },
});

io.on('connection', (socket) => {
  // Only to the user who connected
  socket.emit('message', 'Welcome to the chat room');
  // To all users except the user who connected
  socket.broadcast.emit('message', `User ${socket.id} connected`);

  // To all users except the user who connected
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `User ${socket.id} disconnected`);
  });

  socket.on('message', (data) => {
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });
});
