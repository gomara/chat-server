const workFactor = 8;

import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
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
