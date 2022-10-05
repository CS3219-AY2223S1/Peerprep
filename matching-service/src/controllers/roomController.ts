import { Request, Response } from 'express';
import { roomService } from '../services';

export const getRoomUuid = async (req: Request, res: Response) => {
  if (req.userCred) {
    const roomUuid = await roomService.getRoomUuid(parseInt(req.userCred.id, 10));
    return res.status(200).json({ roomUuid });
  }
  return res.status(500);
};

export const leaveRoom = async (req: Request, res: Response) => {
  if (req.userCred) {
    await roomService.leaveRoom(parseInt(req.userCred.id, 10));
    return res.status(200);
  }
  return res.status(500);
};
