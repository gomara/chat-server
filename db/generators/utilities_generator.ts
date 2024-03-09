export const getRandomElement = <T>(arr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
};

export const generateRandomPassword = (): string => {
  const passwordLength = 8;
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomChar = chars[Math.floor(Math.random() * chars.length)];

    password += randomChar;
  }

  return password;
};

export const generateRandomUsername = (): { username: string } => {
  const username = `user${Math.floor(Math.random() * 100000)}`;

  return { username };
};

export const generateRandomChatRoomName = (): { name: string } => {
  const name = `chat${Math.floor(Math.random() * 100000)}`;

  return { name };
};

export const generateRandomSocketId = (): { socketId: string } => {
  const socketId = `socket${Math.floor(Math.random() * 100000)}`;

  return { socketId };
};
