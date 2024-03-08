import express from 'express';

import {
  getMessagesByRoomId,
  getAllAvaliableRooms,
  postMessage,
} from '../controllers/chatRoomController';
const router = express.Router();

router.get('/', getAllAvaliableRooms);
router.get('/:chatRoomId', getMessagesByRoomId);
router.post('/:chatRoomId/message', postMessage);

export default router;
