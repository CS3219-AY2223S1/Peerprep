import dotenv from 'dotenv';
import SocketServer from './Server';

dotenv.config();
const server = new SocketServer();
server.start();

export default server;
