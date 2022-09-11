import { Server, Socket } from 'socket.io';
import { Difficulty, Event, TIMEOUT } from '../constants';
import { userQueue, sidToUserMap } from '../data';
import { removeUserFromQueue } from './leaveQueue';

let currRoomId = 0;
const waitForTimeout = async (userName: string, ioServer: Server): Promise<void> => {
  const timeout = new Promise((resolve) => setTimeout(resolve, TIMEOUT * 1000));
  await timeout;
  removeUserFromQueue(userName, ioServer);
};

// Join Queue with difficulty => if Queue == 2, pop the first two user emit room or smth
export const joinQueue = (socket: Socket, ioServer: Server) =>
  (params : { difficulty: Difficulty }): void => {
    // TODO: Error handling
    // TODO: Timeout
    const { difficulty } = params;
    const user = sidToUserMap.getUser(socket.id)!;
    userQueue.join(difficulty, user, socket);
    if (userQueue.size(difficulty) >= 2) {
      const u1 = userQueue.pop(difficulty);
      const u2 = userQueue.pop(difficulty);
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
    waitForTimeout(user.userName, ioServer);
  };
