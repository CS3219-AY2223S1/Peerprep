import { Request, Response } from 'express';
import { roomService } from '../services';

export const getActiveRoomInfo = async (req: Request, res: Response) => {
  if (req.userCred) {
    const roomInfo = await roomService.getActiveRoomInfo(parseInt(req.userCred.id, 10));
    return res.status(200).json(roomInfo);
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
