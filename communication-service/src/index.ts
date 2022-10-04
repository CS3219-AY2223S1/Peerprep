import dotenv from 'dotenv';
import SocketServer from './server';

dotenv.config();
const server = new SocketServer();
server.start();

export default server;
