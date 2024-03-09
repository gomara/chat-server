import express from 'express';

import {
  getMessagesByRoomId,
  getAllAvaliableRooms,
  postMessage,
  deleteMessage,
  joinToChatRoomPost,
} from '../controllers/chatRoomController';
import { checkIfUserIsInRoom } from '../middleware/chatRoomMiddleware';
const router = express.Router();

router.get('/', getAllAvaliableRooms);
router.get('/:chatRoomId', getMessagesByRoomId);
router.post('/:chatRoomId/message', checkIfUserIsInRoom, postMessage);
router.post('/:chatRoomId', joinToChatRoomPost);
router.delete('/:chatRoomId/message/:messageId', checkIfUserIsInRoom, deleteMessage);

export default router;
