import { UserModel } from '../../models/User';
import { UserDocumentInterface } from '../../models/interfaces';
import { encryptPassword } from '../../utils/password_utils';

import { generateRandomPassword, generateRandomUsername } from './utilities_generator';

interface UserGeneratorOptions {
  passwordControlled?: string;
}

export const userGenerator = async (
  props?: UserGeneratorOptions,
): Promise<UserDocumentInterface> => {
  const { username } = generateRandomUsername();
  const password =
    props?.passwordControlled != null && props.passwordControlled?.length !== 0
      ? await encryptPassword(props.passwordControlled)
      : await encryptPassword(generateRandomPassword());
  const newUser = await UserModel.create({
    username,
    password,
  });

  return newUser;
};
