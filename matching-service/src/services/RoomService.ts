import { v4 } from 'uuid';
import prisma from '../prisma';
import { User, Difficulty } from '../constants';

export class RoomService {
  async create(u1: User, u2: User, difficulty: Difficulty): Promise<string | null> {
    if (await this.checkInRoom(u1.id) || await this.checkInRoom(u2.id)) {
      return null;
    }
    const room = await prisma.room.create({
      data: {
        uuid: v4(),
        userOneId: u1.id,
        userOneName: u1.userName,
        userTwoId: u2.id,
        userTwoName: u2.userName,
        difficulty: Difficulty[difficulty],
      },
    });
    return room.uuid;
  }

  async checkInRoom(userId: number): Promise<boolean> {
    const room = await prisma.room.findFirst({
      where: {
        OR: [
          { userOneId: userId },
          { userTwoId: userId },
        ],
      },
      orderBy: {
        id: 'desc',
      },
    });
    return !!room && !room.closed;
  }

  async getActiveRoomInfo(userId: number):
  Promise<{ partnerName: string | undefined, uuid: string, difficulty: string } | null> {
    const room = await prisma.room.findFirst({
      where: {
        OR: [
          { userOneId: userId },
          { userTwoId: userId },
        ],
      },
      orderBy: {
        id: 'desc',
      },
    });
    const partnerName = userId === room?.userOneId ? room?.userOneName : room?.userTwoName;
    return (!!room && !room?.closed) ? { difficulty: room.difficulty, partnerName, uuid: room.uuid }
      : null;
  }

  async leaveRoom(userId: number): Promise<void> {
    const room = await prisma.room.findFirst({
      where: {
        OR: [
          { userOneId: userId },
          { userTwoId: userId },
        ],
      },
      orderBy: {
        id: 'desc',
      },
    });
    if (room) {
      await prisma.room.update({
        where: {
          id: room.id,
        },
        data: {
          closed: true,
        },
      });
    }
  }
}
