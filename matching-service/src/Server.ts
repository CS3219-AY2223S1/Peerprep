import express from 'express';
import cors from 'cors';
import http, { Server as httpServer } from 'http';
import { Server } from 'socket.io';
import { Event } from './constants';
import joinQueue from './socket/joinQueue';

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
      path: '/',
      cors: {
        origin: '*',
        methods: ['GET'],
      },
    });

    socketIoServer.on(Event.CONNECTION, ((socket) => {
      console.log(`${socket.id} connected!`);
      socket.on(Event.JOIN_QUEUE, joinQueue(socket, socketIoServer));
    }));

    return { httpServer, socketIoServer };
  }

  start() {
    this.httpServer.listen(8001, () => console.log('Socket server started at port 8001'));
  }
}
