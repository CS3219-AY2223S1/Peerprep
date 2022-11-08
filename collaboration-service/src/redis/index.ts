import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: process.env.REDIS || 'localhost',
    port: 6379,
  },
});

export default redisClient;
