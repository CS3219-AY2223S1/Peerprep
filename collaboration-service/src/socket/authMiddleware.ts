import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { UserCred } from '../constants';

// TODO: Invalid token still can queue (after changing password)
export const authMiddleware = (ioServer: Server) => {
  ioServer.use((socket, next) => {
    const { token } = socket.handshake.auth;
    const roomUuid = socket.handshake.query.roomUuid as unknown as string;
    if (!roomUuid) {
      next(new Error('Room uuid is missing!'));
      return;
    }
    try {
      const decoded: UserCred = jwt
        .verify(token, process.env.LOGIN_SECRET_KEY!) as unknown as UserCred;
      next();
    } catch (error) {
      console.log(error);
      next(new Error('Invalid JWT'));
    }
  });
};
