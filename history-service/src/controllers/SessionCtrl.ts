import { Request, Response } from 'express';
import { Get, Post, Returns } from '@tsed/schema';
import { Controller } from '@tsed/di';
import { UseAuth } from '@tsed/platform-middlewares';
import { Exception, Unauthorized } from '@tsed/exceptions';
import jwt_decode from 'jwt-decode';
import { ISessionModel } from 'src/model/session-model';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import {
  ormCreateSession as _createSession,
  ormGetSessionsByUser as _getSession,
  ormGetSessionByRoom as _checkDuplicateSess,
} from '../model/session-orm';
import { User } from '../constants';
import { transformAllToSessionRes } from '../transformers/session';

@Controller('/session')
export default class SessionCtrl {
  @Post('/add')
  @UseAuth(AuthMiddleware)
  async createSession(req: Request, res: Response) {
    try {
      const token = req.headers.authorization || req.headers.Authorization as unknown as string;
      const user = jwt_decode(token) as User;
      const {
        userTwoName, completedOn, duration, roomUuid, difficulty, code,
      } = req.body;
      req.body.userOneName = user.username;

      if (userTwoName && completedOn && duration && roomUuid && difficulty && code) {
        const duplicateSessions = await _checkDuplicateSess(roomUuid) as Array<any>;
        if (duplicateSessions.length > 0) {
          return res
            .status(400)
            .json({ message: 'Session exists' });
        }

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
  async getUserSessions(req: Request, res: Response) {
    try {
      const token = req.headers.authorization || req.headers.Authorization as unknown as string;
      const user = jwt_decode(token) as User;
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Could not create retrieve any session' });
      }
      const result = (await _getSession(user.username)) as unknown as ISessionModel[];
      return res
        .status(200)
        .json(transformAllToSessionRes(result));
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Database failure when retrieving sessions!' });
    }
  }
}
