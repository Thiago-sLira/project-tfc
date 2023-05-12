import { Request, Response, NextFunction } from 'express';
import AuthJWT from '../utils/AuthJWT';

export default function validateToken(
  req: Request & { user?: number },
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decodedToken = new AuthJWT().validateToken(authorization);
    req.user = decodedToken;

    return next();
  } catch (error) {
    next(error);
  }
}
