export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface User {
  userName: string,
  socketId: string
}

export enum Event {
  CONNECTION = 'connection',
  MATCHED = 'matched',
  JOIN_QUEUE = 'join_queue',
}
