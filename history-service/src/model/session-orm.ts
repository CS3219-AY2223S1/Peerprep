import { createSession } from "./repository";
import { ISessionModel } from "./session-model";

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
