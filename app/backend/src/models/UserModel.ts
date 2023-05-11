import User from '../database/models/User';

export default class UserModel {
  constructor(private user = User) { }

  userLogin(email: string) {
    const userData = this.user.findOne({ where: { email } });
    return userData;
  }
}
