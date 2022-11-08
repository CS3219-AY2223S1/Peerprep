export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface User {
  userName: string;
  id: number;
  socketId: string;
  lastQueue?: Date;
}

export enum Event {
  CONNECTION = 'connection',
  MATCHED = 'matched',
  JOIN_QUEUE = 'join_queue',
  CONNECTED_ELSEWHERE = 'connected_elsewhere',
  ALREADY_IN_QUEUE = 'already_in_queue',
  UNEXPECTED_QUEUE_ERROR = 'unexpected_queue_error',
  LEAVE_QUEUE = 'leave_queue',
  ALREADY_IN_ROOM = 'already_in_room',
}

export interface UserCred {
  username: string;
  id: string;
  iat: number;
  exp: number;
}

export const TIMEOUT = 10;
