export interface User {
  userName: string;
  id: number;
}

export enum Event {
  CONNECTION = 'connection',
  INIT = 'init',
  CODE_UPDATE = 'code_update',
  DISCONNECT_ALL = 'disconnect_all',
}

export interface UserCred {
  username: string;
  id: string;
  iat: number;
  exp: number;
}
const URI_HISTORY_SVC = process.env.URI_HISTORY_SVC || 'http://localhost:8004';

export const URL_CREATE_SESSION = `${URI_HISTORY_SVC}/api/session/add`;
