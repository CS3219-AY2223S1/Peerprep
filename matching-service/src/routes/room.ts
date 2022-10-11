import { Router } from 'express';
import { auth } from '../controllers/authMiddleware';
import { getActiveRoomInfo, leaveRoom } from '../controllers/roomController';

const roomRouter = Router();
roomRouter.get('/roomInfo', auth, getActiveRoomInfo);
roomRouter.post('/leaveRoom', auth, leaveRoom);

export default roomRouter;
