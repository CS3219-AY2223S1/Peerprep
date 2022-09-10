import { Server, Socket } from 'socket.io';
import { Event } from '../constants';
import { userQueue, sidToUserMap } from '../data';

export const leaveQueue = (socket: Socket, ioServer: Server) => (): void => {
  const userToRemove = sidToUserMap.getUser(socket.id);
  removeUserFromQueue(userToRemove?.userName, ioServer);
};

export const removeUserFromQueue = (userName: string | undefined, ioServer: Server) => {
  if (userName && userQueue.checkUserInQ(userName)) {
    const difficulty = userQueue.getDifficulty(userName);
    if (difficulty) {
      let currUser = userQueue.pop(difficulty);
      while (currUser.userName !== userName && userQueue.size(difficulty) > 0) {
        ioServer.to(currUser.socketId).emit(Event.UNEXPECTED_QUEUE_ERROR);
        currUser = userQueue.pop(difficulty);
      }
    }
  }
};
