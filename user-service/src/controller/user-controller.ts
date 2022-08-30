import { Request, Response } from 'express';
import { ormCreateUser as _createUser, ormCheckUserExist as _checkUserExist } from '../model/user-orm';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (username && password) {
        // check if user exists
        const isExist = await _checkUserExist(username);
        if (isExist) {
          return res.status(409).json({ message: 'Account already exists!' });
        }

        // create a new user
        const resp = await _createUser({ username, password });
        console.log(resp);
        if (!resp) {
          return res.status(400).json({ message: 'Could not create a new user!' });
        }
        console.log(`Created new user ${username} successfully!`);
        return res.status(201).json({ message: `Created new user ${username} successfully!` });
      }
      return res.status(400).json({ message: 'Username and/or Password are missing!' });
    } catch (err) {
      return res.status(500).json({ message: 'Database failure when creating new user!' });
    }
  }
}

export default UserController;
