
import { Request, Response } from "express";
import { Get, Post, string } from "@tsed/schema";
import { Controller } from "@tsed/di";
import {
    ormCreateSession as _createSession
} from "../model/session-orm";


@Controller('/session')
export default class SessionCtrl {
    @Post('/add')
    async createSession(req: Request, res: Response) {
        try {
            const { username, partnername, completedOn, duration, difficulty, code } = req.body;
            if (username && partnername && completedOn && duration && difficulty) {
                const resp = await _createSession(req.body);

                if (!resp) {
                    return res
                        .status(400)
                        .json({ message: 'Could not create a new session!' });
                }
                return res
                    .status(201)
                    .json({ message: `Created new session successfully!` });
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

    @Get('/test')
    async test1 (req: Request, res: Response) {
        return res.status(200);
    }
}