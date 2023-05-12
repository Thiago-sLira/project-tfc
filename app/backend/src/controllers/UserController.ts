import { Request, Response } from 'express';
import UserService from '../services/UserService';
import IRequest from '../interfaces/IRequest';
import { LoginRole } from '../interfaces/LoginRole';

export default class UserController {
  constructor(private userService = new UserService()) { }

  async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const userToken = await this.userService.userLogin({ email, password });
    res.status(200).json({ token: userToken });
  }

  static async userRole(req: IRequest, res: Response) {
    const { role } = req.user as LoginRole;

    res.status(200).json({ role });
  }
}
