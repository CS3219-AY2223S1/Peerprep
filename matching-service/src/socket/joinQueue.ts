import { Queue } from '@datastructures-js/queue';
import { Server, Socket } from 'socket.io';
import { Difficulty, Event, User } from '../constants';

const queues = new Map<Difficulty, Queue<User>>();

Object.values(Difficulty).forEach((difficulty) => {
  const q = new Queue<User>();
  queues.set(difficulty, q);
});

let currRoomId = 0;
// Join Queue with difficulty => if Queue == 2, pop the first two user emit room or smth
const joinQueue = (socket: Socket, ioServer: Server) =>
  (params : { userName: string, difficulty: Difficulty }): void => {
    // TODO: Check if user is valid/authenticated, or already inside
    // TODO: We need to prevent same users join multiple time
    // TODO: Error handling
    // TODO: Timeout
    const { userName, difficulty } = params;
    const queue = queues.get(difficulty);
    queue!.push({ userName, socketId: socket.id });
    if (queue!.size() >= 2) {
      const u1 = queue!.pop();
      const u2 = queue!.pop();
      ioServer
        .to(u1.socketId)
        .emit(Event.MATCHED, { roomId: currRoomId, partner: u2.userName });
      ioServer
        .to(u2.socketId)
        .emit(Event.MATCHED, { roomId: currRoomId, partner: u1.userName });
      ioServer.in(u1.socketId).socketsJoin(currRoomId.toString());
      ioServer.in(u1.socketId).socketsJoin(currRoomId.toString());
      currRoomId += 1;
    }
  };
export default joinQueue;
