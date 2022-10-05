import { Server, Socket } from 'socket.io';
import { Difficulty, Event, TIMEOUT } from '../constants';
import { userQueue, sidToUserMap } from '../data';
import { removeUserFromQueue } from './leaveQueue';
import { roomService } from '../services';

const waitForTimeout = (userName: string, ioServer: Server): void => {
  setTimeout(() => removeUserFromQueue(userName, ioServer), TIMEOUT * 1000);
};

// Join Queue with difficulty => if Queue == 2, pop the first two user emit room or smth
export const joinQueue = (socket: Socket, ioServer: Server) =>
  async (params: { difficulty: Difficulty }): Promise<void> => {
    const { difficulty } = params;
    const user = sidToUserMap.getUser(socket.id)!;
    if (await roomService.checkInRoom(user.id)) {
      ioServer.to(user.socketId).emit(Event.ALREADY_IN_ROOM);
      return;
    }
    userQueue.join(difficulty, user, socket);
    if (userQueue.size(difficulty) >= 2) {
      const u1 = userQueue.pop(difficulty);
      const u2 = userQueue.pop(difficulty);
      const roomUuid = roomService.create(u1.id, u2.id);
      ioServer
        .to(u1.socketId)
        .emit(Event.MATCHED, { roomUuid, partner: u2.userName });
      ioServer
        .to(u2.socketId)
        .emit(Event.MATCHED, { roomUuid, partner: u1.userName });
    }
    waitForTimeout(user.userName, ioServer);
  };
