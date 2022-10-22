import { Request, Response } from 'express';
import { Get, Post, Returns } from '@tsed/schema';
import { Controller } from '@tsed/di';
import { UseAuth } from '@tsed/platform-middlewares';
import { Unauthorized } from '@tsed/exceptions';
import jwt_decode from 'jwt-decode';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import {
  ormCreateSession as _createSession,
  ormGetSessionsByUser as _getSession,
} from '../model/session-orm';

@Controller('/session')
export default class SessionCtrl {
  @Post('/add')
  @UseAuth(AuthMiddleware)
  @Returns(401, Unauthorized).Description("Unauthorized")
  async createSession(req: Request, res: Response) {
    try {
      const {
        username, partnername, completedOn, duration, difficulty,
      } = req.body;
      if (username && partnername && completedOn && duration && difficulty) {
        const resp = await _createSession(req.body);

        if (!resp) {
          return res
            .status(400)
            .json({ message: 'Could not create a new session!' });
        }
        return res
          .status(201)
          .json({ message: 'Created new session successfully!' });
      }
      return res
        .status(401)
        .json({ message: 'Missing fields!' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Database failure when creating new session!' });
    }
  }

  @Get('/userSession')
  @UseAuth(AuthMiddleware)
  @Returns(401, Unauthorized).Description("Unauthorized")
  async getUserSessions(req: Request, res: Response) {
    try {
            type User = { username: String, id: number };
            const token = req.headers.authorization || req.headers.Authorization as unknown as string;
            const user = jwt_decode(token) as User;
            if (!user) {
              return res
                .status(400)
                .json({ message: 'Could not create retrieve any session' });
            }
            const result = await _getSession(user.username);
            return res
              .status(200)
              .json(result);
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Database failure when retrieving sessions!' });
    }
  }
}
