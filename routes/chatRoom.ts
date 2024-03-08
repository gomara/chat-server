import express from 'express';

import { getMessagesByRoomId, getAllAvaliableRooms } from '../controllers/chatRoomController';
const router = express.Router();

router.get('/:chatRoomId', getMessagesByRoomId);
router.get('/', getAllAvaliableRooms);

export default router;
