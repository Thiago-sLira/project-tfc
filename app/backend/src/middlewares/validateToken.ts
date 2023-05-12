import { Response, NextFunction } from 'express';
import { LoginRole } from '../interfaces/LoginRole';
import AuthJWT from '../utils/AuthJWT';
import IRequest from '../interfaces/IRequest';

export default function validateToken(
  req: IRequest,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const decodedToken = new AuthJWT().validateToken<LoginRole>(authorization);
  req.user = decodedToken;

  return next();
}
