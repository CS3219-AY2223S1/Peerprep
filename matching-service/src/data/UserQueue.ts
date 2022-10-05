import { Queue } from '@datastructures-js/queue';
import { Socket } from 'socket.io';
import { Difficulty, User, Event } from '../constants';

class UserQueue {
  private queues = new Map<Difficulty, Queue<User>>();

  private userNameToDifficulty = new Map<string, Difficulty>();

  constructor() {
    Object.values(Difficulty).forEach((difficulty) => {
      const q = new Queue<User>();
      this.queues.set(difficulty, q);
    });
  }

  public join(difficulty: Difficulty, user: User, socket: Socket) {
    if (this.userNameToDifficulty.has(user.userName)) {
      socket.emit(Event.ALREADY_IN_QUEUE);
      return;
    }
    const queue = this.queues.get(difficulty);
    queue!.push({ userName: user.userName, id: user.id, socketId: socket.id });
    this.userNameToDifficulty.set(user.userName, difficulty);
  }

  public pop(difficulty: Difficulty) {
    const queue = this.queues.get(difficulty);
    const user = queue!.pop();
    this.userNameToDifficulty.delete(user.userName);
    return user;
  }

  public checkUserInQ(userName: string) {
    return this.userNameToDifficulty.has(userName);
  }

  public getDifficulty(userName: string) {
    return this.userNameToDifficulty.get(userName);
  }

  public size(difficulty: Difficulty) {
    return this.queues.get(difficulty)!.size();
  }
}

export default new UserQueue();
