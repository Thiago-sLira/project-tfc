import { ErrorRequestHandler } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import ErrorLaunch from '../utils/ErrorLaunch';

const errorHandler: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  if (err instanceof ErrorLaunch) {
    return res.status(err.code).json({ message: err.message });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  console.log(err);

  return res.status(500).json({ message: 'Erro inesperado!' });
};

export default errorHandler;
