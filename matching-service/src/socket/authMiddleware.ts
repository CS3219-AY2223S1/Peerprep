import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { UserCred } from '../constants';
import sidToUserMap from '../data/SidToUserMap';

// TODO: Invalid token still can queue (after changing password)
export const authMiddleware = (ioServer: Server) => {
  ioServer.use((socket, next) => {
    const { token } = socket.handshake.auth;
    try {
      const decoded: UserCred = jwt
        .verify(token, process.env.LOGIN_SECRET_KEY!) as unknown as UserCred;
      sidToUserMap.addUser(
        socket.id,
        { userName: decoded.username, socketId: socket.id },
        ioServer,
      );
      next();
    } catch (error) {
      console.log(error);
      next(new Error('Invalid JWT'));
    }
  });
};
