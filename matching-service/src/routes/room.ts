import { Router } from 'express';
import { auth } from '../controllers/authMiddleware';
import { getRoomUuid, leaveRoom } from '../controllers/roomController';

const roomRouter = Router();
roomRouter.get('/roomUuid', auth, getRoomUuid);
roomRouter.post('/leaveRoom', auth, leaveRoom);

export default roomRouter;
