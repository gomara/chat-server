import express from 'express';

import { loginUser, registerUser } from '../controllers/authController';
import { encode } from '../middleware/jwt';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', encode, loginUser);

export default router;
