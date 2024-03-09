const workFactor = 8;

import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
  if (password.length === 0) throw new Error('Password is required');
  if (password.length >= 1000) throw new Error('Password is too long');
  const salt = await bcrypt.genSalt(workFactor);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const validatePassword = async (
  incommingPassword: string,
  dataBasePassword: string,
): Promise<boolean> => {
  if (incommingPassword.length === 0) return false;
  const decode = await bcrypt.compare(incommingPassword, dataBasePassword);

  return decode;
};
