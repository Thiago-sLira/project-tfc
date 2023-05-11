import UserModel from '../models/UserModel';
import AuthJWT from '../utils/authJWT';

export default class UserService {
  constructor(private userModel = new UserModel()) { }

  async userLogin({ email, password }: { email: string, password: string }) {
    const userData = await this.userModel.userLogin(email);

    if (!userData || userData.password !== password) {
      throw new Error('Invalid email or password');
    }

    const NewJWT = new AuthJWT();
    const loginToken = NewJWT.generateToken({ email, role: userData.role });

    return loginToken;
  }
}
