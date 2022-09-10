export const STATUS_CODE_CREATED = 201;
export const STATUS_CODE_CONFLICT = 409;
export const STATUS_CODE_UNAUTHORISED = 406;
export const STATUS_CODE_FORBIDDEN = 403;
export const STATUS_CODE_INVALID = 401;
export const STATUS_CODE_SUCCESS = 200;

export enum Match {
  TIMEOUT = 10,
  REDIRECT_TIME = 3,
}

export enum Difficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD',
}

export enum SocketEvent {
  MATCHED = 'matched',
  JOIN_QUEUE = 'join_queue',
  CONNECTED_ELSEWHERE = 'connected_elsewhere',
  ALREADY_IN_QUEUE = 'already_in_queue',
  UNEXPECTED_QUEUE_ERROR = 'unexpected_queue_error',
  LEAVE_QUEUE = 'leave_queue',
}