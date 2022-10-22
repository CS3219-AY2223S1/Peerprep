import { createSession, getSession } from './repository';
import sessionModel, { ISessionModel } from './session-model';

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
      username: name,
    };
    return await getSession(options);
  } catch (err) {
    console.log('ERROR: Could not get sessions by username');
    return { err };
  }
}
