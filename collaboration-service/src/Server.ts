import express from 'express';
import cors from 'cors';
import http, { Server as httpServer } from 'http';
import { Server } from 'socket.io';
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
        methods: ['GET'],
      },
    });
    authMiddleware(socketIoServer);
    socketIoServer.on(Event.CONNECTION, ((socket) => {
      console.log(`${socket.id} connected!`);
    }));

    return { httpServer, socketIoServer };
  }

  start() {
    this.httpServer.listen(9001, () => console.log('Socket server started at port 9001'));
  }
}
