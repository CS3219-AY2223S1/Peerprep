import express from 'express';
import cors from 'cors';
import http, { Server as httpServer } from 'http';
import { Server } from 'socket.io';
import redisClient from './redis';
import { Event } from './constants';
import { authMiddleware } from './socket';

export default class SocketServer {
  private httpServer: httpServer;

  private socketIoServer: Server;

  constructor() {
    const { httpServer, socketIoServer } = this.createServer();
    this.httpServer = httpServer;
    this.socketIoServer = socketIoServer;
  }

  private createExpress() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors()); // config cors so that front-end can use
    app.options('*', cors());
    return app;
  }

  private createServer() {
    const app = this.createExpress();
    const httpServer = http.createServer(app);

    const socketIoServer = new Server(httpServer, {
      path: '/collaborate',
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
    authMiddleware(socketIoServer);
    socketIoServer.on(Event.CONNECTION, (async (socket) => {
      const roomUuid = socket.handshake.query.roomUuid as unknown as string;
      console.log(`${socket.id} connected!`);
      console.log(roomUuid);
      socket.join(roomUuid);
      await redisClient.setNX(roomUuid, '');
      socket.emit(Event.INIT, await redisClient.get(roomUuid));
      socket.on(Event.CODE_UPDATE, async (code: string) => {
        await redisClient.set(roomUuid, code);
        socket.broadcast.to(roomUuid).emit(Event.CODE_UPDATE, code);
      });
      socket.on(Event.DISCONNECT_ALL, () => {
        socket.broadcast.to(roomUuid).emit(Event.DISCONNECT_ALL);
      });
    }));
    return { httpServer, socketIoServer };
  }

  start() {
    this.httpServer.listen(9001, () => console.log('Socket server started at port 9001'));
  }
}
