import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserCred } from '../constants';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: Call API => to verify token
    const token = req.headers.authorization;
    if (token === undefined) {
      return res.sendStatus(401);
    }
    const decoded = jwt
      .verify(token, process.env.LOGIN_SECRET_KEY!);
    req.userCred = decoded as unknown as UserCred;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
