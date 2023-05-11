import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) { }

  async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const userToken = await this.userService.userLogin({ email, password });
    res.status(200).json({ token: userToken });
  }
}
