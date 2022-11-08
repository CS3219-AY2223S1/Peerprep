import { Server } from 'socket.io';
import { User, Event } from '../constants';

class SidToUserMap {
  private sidToUserMap;

  constructor() {
    this.sidToUserMap = new Map<string, User>();
  }

  public addUser(sid: string, user: User, server: Server) {
    const oldSocket = [...this.sidToUserMap.keys()]
      .find((key) => this.sidToUserMap.get(key)?.id === user.id);
    if (oldSocket) {
      server.in(oldSocket).emit(Event.CONNECTED_ELSEWHERE);
      server.in(oldSocket).disconnectSockets(true);
      this.sidToUserMap.delete(oldSocket);
    }
    this.sidToUserMap.set(sid, user);
  }

  public getUser(sid: string) {
    return this.sidToUserMap.get(sid);
  }
}
export default new SidToUserMap();
