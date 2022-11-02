import { SessionRes } from 'src/constants';
import { ISessionModel } from 'src/model/session-model';

export const transformToSessionRes = (session: ISessionModel): SessionRes => ({
  userOneName: session.userOneName,
  userTwoName: session.userTwoName,
  completedOn: session.completedOn,
  duration: session.duration,
  difficulty: session.difficulty,
  code: session.code,
} as SessionRes);

export const transformAllToSessionRes = (sessions: ISessionModel[]): SessionRes[] => sessions.map((sess) => transformToSessionRes(sess));
