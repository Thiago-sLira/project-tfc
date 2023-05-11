import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import UserModel from '../models/UserModel';
import AuthJWT from '../utils/authJWT';
import ErrorLaunch from '../utils/ErrorLaunch';

export default class UserService {
  constructor(private userModel = new UserModel()) { }

  async userLogin({ email, password }: { email: string, password: string }) {
    const userData = await this.userModel.userLogin(email);

    if (!userData || !UserService.verifyUser(userData, password)) {
      throw new ErrorLaunch('Invalid email or password', 401);
    }

    const NewJWT = new AuthJWT();
    const loginToken = NewJWT.generateToken({ email, role: userData.role });

    return loginToken;
  }

  private static verifyUser(user: User, password: string) {
    return bcrypt.compareSync(password, user.password);
  }
}
