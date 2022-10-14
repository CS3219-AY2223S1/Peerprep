import dotenv from 'dotenv';
import SocketServer from './Server';
import redisClient from './redis';

dotenv.config();
const server = new SocketServer();
redisClient.connect().then(() => server.start());

export default server;
