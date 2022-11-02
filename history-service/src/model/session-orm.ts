import { createSession, getSession } from './repository';
import { ISessionModel } from './session-model';

export async function ormCreateSession(session: ISessionModel) {
  try {
    const newSession = await createSession(session);
    newSession.save();
    return true;
  } catch (err) {
    console.log('ERROR: Could not create new session');
    return { err };
  }
}

export async function ormGetSessionsByUser(name: String) {
  try {
    const options = {
      $or: [{ userOneName: name }, { userTwoName: name }],
    };
    return await getSession(options);
  } catch (err) {
    console.log('ERROR: Could not get sessions by username');
    return { err };
  }
}

export async function ormGetSessionByRoom(uuid: String) {
  try {
    const options = {
      roomUuid: uuid,
    };
    return await getSession(options);
  } catch (err) {
    console.log('ERROR: Could not get sessions by room uuid');
    return { err };
  }
}
