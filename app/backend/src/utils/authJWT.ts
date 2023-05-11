import * as jwt from 'jsonwebtoken';

export default class authJWT {
  constructor(
    private configJWTDefault: jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
    private secretKey: string = process.env.JWT_SECRET || 'secret',
  ) { }

  generateToken = (
    payload: object,
    configJWT = this.configJWTDefault,
  ) => {
    const token = jwt.sign(payload, this.secretKey, configJWT);
    return token;
  };

  validateToken = (token: string) => {
    const isValid = jwt.verify(token, this.secretKey);
    return isValid;
  };
}
