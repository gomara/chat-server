import {
  getUserById,
  createNewUser,
  getUserBySocketId,
  getUserByUsername,
  validateUserCredentials,
  associateUserToSocket,
  removeSocketIdFromUser,
} from '../userService';
import { clearDatabase, closeDatabase, dbTestConnect } from '../../db/dbtest';
import { userGenerator } from '../../db/generators/user_generator';
import { UserDocumentInterface } from '../../models/interfaces';

let user: UserDocumentInterface;
const userPassword = 'you are hired';

const createUsers = async (): Promise<void> => {
  user = await userGenerator({ associateToSocket: true, passwordControlled: userPassword });
};

beforeAll(async () => {
  await dbTestConnect();
  await createUsers();
});

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe('User services expected behaviour', () => {
  test('getUserById should retrieve correct user', async () => {
    const findedUser = await getUserById(user.id);

    expect(findedUser).toBeDefined();
    expect(findedUser.id).toBe(user.id);
  });
  test('getUserByUsername should retrieve correct user', async () => {
    const findedUser = await getUserByUsername(user.username);

    expect(findedUser).toBeDefined();
    expect(findedUser.id).toBe(user.id);
  });
  test('getUserBySocketId should retrieve correct user', async () => {
    const findedUser = await getUserBySocketId(user.socketId);

    expect(findedUser).toBeDefined();
    expect(findedUser.id).toBe(user.id);
  });
  test('removeSocketIdFromUser should retrieve correct user without socketId', async () => {
    await removeSocketIdFromUser(user.id);
    const updatedUser = await getUserById(user.id);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.socketId).toBeUndefined();
  });
  test('associateUserToSocket should retrieve correct user without socketId', async () => {
    const randomSocketId = 'socket4321';

    await associateUserToSocket(user.id, randomSocketId);
    const updatedUser = await getUserById(user.id);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.socketId).toBe(randomSocketId);
  });
  test('validateUserCredentials should retrieve true on valid password', async () => {
    const isValid = validateUserCredentials(user.username, userPassword);

    expect(isValid).toBeTruthy();
  });
  test('validateUserCredentials should retrieve false on invalid password', async () => {
    const isValid = validateUserCredentials(user.username, 'hello');

    expect(isValid).toBeTruthy();
  });
  test('validateUserCredentials should retrieve false on invalid username', async () => {
    const isValid = validateUserCredentials('invalid user', 'hello');

    expect(isValid).toBeTruthy();
  });
  test('createNewUser should create a new valid user', async () => {
    const newUser = await createNewUser('cyberspeed', userPassword);

    expect(newUser).toBeDefined();
    expect(newUser.id).toBeDefined();
    expect(newUser.password).toBeDefined();
    expect(newUser.socketId).toBeUndefined();
  });
  test('createNewUser should return an error because user already exist', async () => {
    await expect(createNewUser(user.username, userPassword)).rejects.toThrow('User already exists');
  });
});
