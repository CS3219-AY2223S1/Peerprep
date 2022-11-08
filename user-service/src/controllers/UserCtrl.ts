import { Request, Response } from 'express';
import { Post } from '@tsed/schema';
import { Controller } from '@tsed/di';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  ormCreateUser as _createUser,
  ormCheckUserExist as _checkUserExist,
  ormDeleteUser as _deleteUser,
  ormVerifyUserCredentials as _verifyUserCredentials,
  ormGetUserId as _getUserId,
  ormUpdateUserPassword as _updateUserPassword,
} from '../model/user-orm';
import { verifyToken } from '../middlewares/verifyMiddleware';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { UseAuth } from '@tsed/common';

@Controller('/user')
export default class UserCtrl {
  @Post('/signup')
  async createUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (username && password) {
        // check if user exists

        const isExist = await _checkUserExist(username);
        if (isExist) {
          return res.status(409).json({ message: 'Account already exists!' });
        }

        if (password.length < 8) {
          return res
            .status(406)
            .json({ message: 'Password must be at least 8 characters long!' });
        }
        // Hash the password with a cost factor of 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user
        const resp = await _createUser({ username, password: hashedPassword });
        console.log(resp);
        if (!resp) {
          return res
            .status(400)
            .json({ message: 'Could not create a new user!' });
        }
        console.log(`Created new user ${username} successfully!`);
        return res
          .status(201)
          .json({ message: `Created new user ${username} successfully!` });
      }
      return res
        .status(401)
        .json({ message: 'Username and/or Password are missing!' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Database failure when creating new user!' });
    }
  }

  @Post('/login')
  async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (username && password) {
        const isMatch = await _verifyUserCredentials(username, password);
        if (isMatch) {
          const userId = await _getUserId(username);
          const user = {
            username,
            id: userId,
          };
          const accessToken = jwt.sign(user, process.env.LOGIN_SECRET_KEY!, {
            expiresIn: 60 * 60 * 24,
          }); // expires in 24 hours
          return res.status(200).json({
            message: `Logged in as ${username} successfully!`,
            accessToken,
          });
        }
        return res
          .status(403)
          .json({ message: 'Invalid Username and/or Password!' });
      }
      return res
        .status(401)
        .json({ message: 'Username and/or Password are missing!' });
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'No Username and/or Password sent!' });
    }
  }

  @Post('/verify')
  async verifyUser(req: Request, res: Response) {
    const token = req.body.accessToken;
    if (token) {
      const verifiedToken = await verifyToken(token);
      if (verifiedToken) {
        const user = {
          username: (verifiedToken as JwtPayload).username,
          id: (verifiedToken as JwtPayload).id,
        };
        const newToken = jwt.sign(user, process.env.LOGIN_SECRET_KEY!, {
          expiresIn: 60 * 60 * 24,
        });
        return res.status(200).json({
          message: 'User successfully verified!',
          accessToken: newToken,
        });
      }
      return res.status(403).json({ message: 'Invalid jwt!' });
    } if (!token) {
      return res.sendStatus(401).json({ message: 'No user stored in cookie!' });
    }
  }

  @Post('/delete')
  @UseAuth(AuthMiddleware)
  async deleteUser(req: Request, res: Response) {
    const { password } = req.body;
    const accessToken = req.headers.authorization || req.headers.Authorization as unknown as string;

    const verifiedToken = await verifyToken(accessToken);
    const { username } = verifiedToken as JwtPayload;
    if (!(username && password)) {
      return res
        .status(401)
        .json({ message: 'Username and/or Password are missing!' });
    }
    const isMatch = await _verifyUserCredentials(username, password);
    if (!isMatch) {
      return res
        .status(403)
        .json({ message: 'Invalid Username and/or Password!' });
    }
    const success = await _deleteUser(username);
    if (success) {
      return res.status(200).json({ message: 'User successfully deleted!' });
    }
    return res.status(500).json({ message: 'User unable to be deleted!' });
  }

  @Post('/change_password')
  @UseAuth(AuthMiddleware)
  async changeUserPassword(req: Request, res: Response) {
    const { password, newPassword } = req.body;
    const accessToken = req.headers.authorization || req.headers.Authorization as unknown as string;
    if (password === newPassword) {
      return res
        .status(409)
        .json({ message: 'New password cannot be the same as old password!' });
    }
    const verifiedToken = await verifyToken(accessToken);
    const { username } = verifiedToken as JwtPayload;
    if (!(username && password)) {
      return res
        .status(401)
        .json({ message: 'Username and/or Password are missing!' });
    }
    const isMatch = await _verifyUserCredentials(username, password);
    if (!isMatch) {
      return res
        .status(403)
        .json({ message: 'Invalid Username and/or Password!' });
    }
    // Hash the password with a cost factor of 10
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const success = await _updateUserPassword(username, hashedPassword);
    if (success) {
      const userId = await _getUserId(username);
      const user = {
        username,
        id: userId,
      };
      const accessToken = jwt.sign(user, process.env.LOGIN_SECRET_KEY!, {
        expiresIn: 60 * 60 * 24,
      }); // expires in 24 hours
      return res.status(200).json({
        message: 'User password successfully updated!',
        accessToken,
      });
    }
    return res
      .status(500)
      .json({ message: 'User password unable to be updated!' });
  }
}
