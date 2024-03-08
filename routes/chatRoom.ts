import express from 'express';

import {
  getMessagesByRoomId,
  getAllAvaliableRooms,
  postMessage,
} from '../controllers/chatRoomController';
import { checkIfUserIsInRoom } from '../middleware/chatRoomMiddleware';
const router = express.Router();

router.get('/', getAllAvaliableRooms);
router.get('/:chatRoomId', getMessagesByRoomId);
router.post('/:chatRoomId/message', checkIfUserIsInRoom, postMessage);

export default router;
