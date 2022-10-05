import { v4 } from 'uuid';
import prisma from '../prisma';

export class RoomService {
  async create(userOneId: number, userTwoId: number): Promise<string | null> {
    if (await this.checkInRoom(userOneId) || await this.checkInRoom(userTwoId)) {
      return null;
    }
    const room = await prisma.room.create({
      data: {
        uuid: v4(),
        userOneId,
        userTwoId,
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

  async getRoomUuid(userId: number): Promise<string | null> {
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
    return (!!room && !room?.closed) ? room.uuid : null;
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
          id: userId,
        },
        data: {
          closed: true,
        },
      });
    }
  }
}
