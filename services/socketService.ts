import { getUserChatRoom, joinUserToChatRoom, removeUserFromChatRoom } from './chatRoomService';
import { createMessage } from './messageService';
import { getUserBySocketId, getUserByUsername } from './userService';

export const joinRoom = async (socket, username, roomId) => {
  await joinUserToChatRoom(username, roomId, socket.id);
  socket.join(roomId);

  //Send a message to the user who joined
  socket.emit('message', `You have joined the ${roomId} chat room`);

  // To everyone else
  socket.broadcast.to(roomId).emit('message', `${username} has joined the room`);
};

export const leaveRoom = async (socket, username, previousRoom, io) => {
  socket.leave(previousRoom._id);
  await removeUserFromChatRoom(username);
  io.to(previousRoom._id).emit('message', `User ${socket.id} left the room`);
};

export const handleMessage = async (io, username, message, roomId) => {
  const postedByUser = await getUserByUsername(username);

  await createMessage(message, postedByUser.id, roomId);
  const currentRoom = await getUserChatRoom(username);

  if (currentRoom) {
    io.to(currentRoom.id).emit('message', `${username}: ${message}`);
  }
};

export const handleDisconnect = async (socket) => {
  const user = await getUserBySocketId(socket.id);

  if (user) {
    await removeUserFromChatRoom(user.username);
  }
  socket.broadcast.emit('message', `${user.username} disconnected`);
};
