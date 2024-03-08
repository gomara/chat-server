import jwt from 'jsonwebtoken';

import { getUserByUsername, validateUserCredentials } from '../services/userService';

export const encode = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Missing username and/or password' });
    }

    const isValid = await validateUserCredentials(username, password);

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const user = await getUserByUsername(username);
    const payload = {
      userId: user._id,
    };

    const authToken = jwt.sign(payload, process.env.SECRET_KEY);

    req.authToken = authToken;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

export const decode = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error });
  }
};
