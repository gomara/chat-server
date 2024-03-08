import { createNewUser } from '../services/userService';
import { encryptPassword } from '../utils/password_utils';

interface ErrorResponse {
  success: boolean;
  message: string;
}

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Missing username and/or password' });
    }
    try {
      const hashedPassword = await encryptPassword(password);
      const user = await createNewUser(username, hashedPassword);

      return res.status(201).json({ success: true, user });
    } catch (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        const response: ErrorResponse = { success: false, message: 'User already exists' };

        return res.status(409).json(response);
      }

      return res.status(500).json({ success: false, error });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

export const loginUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    authorization: req.authToken,
  });
};
