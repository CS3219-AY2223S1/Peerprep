export interface User {
  userName: string;
  id: number;
}

export enum Event {
  CONNECTION = 'connection',
}

export interface UserCred {
  username: string;
  id: string;
  iat: number;
  exp: number;
}
