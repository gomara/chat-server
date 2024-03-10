import { UserModel } from '../../models/User';
import { UserDocumentInterface } from '../../models/interfaces';
import { encryptPassword } from '../../utils/password_utils';

import {
  generateRandomPassword,
  generateRandomSocketId,
  generateRandomUsername,
} from './utilities_generator';

interface UserGeneratorOptions {
  passwordControlled?: string;
  associateToSocket: boolean;
}

export const userGenerator = async (
  props?: UserGeneratorOptions,
): Promise<UserDocumentInterface> => {
  const { username } = generateRandomUsername();
  const password =
    props?.passwordControlled != null && props.passwordControlled?.length !== 0
      ? await encryptPassword(props.passwordControlled)
      : await encryptPassword(generateRandomPassword());
  const socketId = props?.associateToSocket ? generateRandomSocketId().socketId : null;
  const newUser = await UserModel.create({
    username,
    password,
    socketId,
  });

  return newUser;
};

export const userGeneratorFromEnv = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<UserDocumentInterface> => {
  const hashedPassword = await encryptPassword(password);
  const newUser = await UserModel.create({
    username,
    password: hashedPassword,
  });

  return newUser;
};
