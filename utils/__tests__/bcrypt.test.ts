import { encryptPassword, validatePassword } from '../password_utils';

describe('encryptPassword expected behaviour', () => {
  test('test encrypt password valid input', async () => {
    const password = 'password123';
    const hashedPassword = await encryptPassword(password);

    expect(hashedPassword).not.toBe(password);
  });

  test('test encrypt password empty input', async () => {
    const password = '';

    await expect(encryptPassword(password)).rejects.toThrow();
  });

  test('test encrypt password max length input', async () => {
    const password = 'a'.repeat(1000);

    await expect(encryptPassword(password)).rejects.toThrow();
  });

  test('test encrypt password returns string', async () => {
    const hashedPassword = await encryptPassword('password');

    expect(typeof hashedPassword).toBe('string');
  });
});

describe('validatePassword expected behaviour', () => {
  test('test passwords match', async () => {
    const incomingPassword = 'password123';
    const databasePassword = await encryptPassword(incomingPassword);
    const result = await validatePassword(incomingPassword, databasePassword);

    expect(result).toBe(true);
  });

  test('test passwords do not match', async () => {
    const incomingPassword = 'password123';
    const databasePassword = await encryptPassword('differentpassword');
    const result = await validatePassword(incomingPassword, databasePassword);

    expect(result).toBe(false);
  });

  test('test special characters password', async () => {
    const incomingPassword = 'p@ssword!23';
    const databasePassword = await encryptPassword(incomingPassword);
    const result = await validatePassword(incomingPassword, databasePassword);

    expect(result).toBe(true);
  });

  test('test empty password', async () => {
    const result = await validatePassword('', 'hashedPassword');

    expect(result).toBe(false);
  });
});
