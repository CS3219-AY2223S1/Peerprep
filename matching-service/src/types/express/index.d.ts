import { UserCred } from '../../constants';

export {};

declare global {
  namespace Express {
    export interface Request {
      userCred?: UserCred;
    }
  }
}
