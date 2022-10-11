import express from 'express';
import cors from 'cors';
import http, { Server as httpServer } from 'http';
import { Server } from 'socket.io';

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
        methods: ['GET', 'POST'],
      },
    });

    socketIoServer.on('connection', (socket) => {
      socket.on('joinRoom', (data) => {
        socket.join(data.roomUuid);
        const { sockets } = socketIoServer.sockets;
        if (sockets && sockets.size > 1) {
          socket.to(data.roomUuid).emit('inRoom', { user: data.user });
        }
      });

      socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded');
      });

      socket.on('callUser', (data) => {
        socket.to(data.roomToCall).emit('callUser', { signal: data.signalData });
      });

      socket.on('answerCall', (data) => socket.to(data.to).emit('callAccepted', data.signal));
    });
    // TODO
    // authMiddleware(socketIoServer);
    return { httpServer, socketIoServer };
  }

  start() {
    this.httpServer.listen(8002, () => console.log('Socket server started at port 8002'));
  }
}
