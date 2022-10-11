import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { UserCred } from './constants';

export const authMiddleware = (ioServer: Server) => {
  ioServer.use((socket, next) => {
    const { token } = socket.handshake.auth;
    try {
      jwt.verify(token, process.env.LOGIN_SECRET_KEY!) as unknown as UserCred;
      next();
    } catch (error) {
      next(new Error('Invalid JWT'));
    }
  });
};
