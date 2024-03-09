import { UserModel } from '../models/User';
import { validatePassword } from '../utils/password_utils';

export const createNewUser = async (username: string, password: string) => {
  const existingUser = await UserModel.findOne({
    username,
  });

  if (existingUser) {
    throw new Error('User already exists');
  }
  const user = await UserModel.create({ username, password });

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await UserModel.findOne({ username });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await UserModel.findById(id);

  return user;
};

export const getUserBySocketId = async (socketId: string) => {
  const user = await UserModel.findOne({ socketId });

  return user;
};

export const validateUserCredentials = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username });

  if (!user) {
    return false;
  }
  const isValid = await validatePassword(password, user.password);

  return isValid;
};

export const associateUserToSocket = async (userId: string, socketId: string) => {
  const user = await UserModel.findById(userId);

  user.socketId = socketId;
  await user.save();
};

export const removeSocketIdFromUser = async (userId: string) => {
  const user = await UserModel.findById(userId);

  user.socketId = undefined;
  await user.save();
};
