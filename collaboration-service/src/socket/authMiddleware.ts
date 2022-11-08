import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { UserCred } from '../constants';

// TODO: Invalid token still can queue (after changing password)
export const authMiddleware = (ioServer: Server) => {
  ioServer.use((socket, next) => {
    const { token } = socket.handshake.auth;
    const {
      roomUuid, partner, difficulty, createdAt,
    } = socket.handshake.query;
    if (!(!!roomUuid && !!partner && !!difficulty && !!createdAt)) {
      next(new Error('Information is missing!'));
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
