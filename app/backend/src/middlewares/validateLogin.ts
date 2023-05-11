import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import statusCodes from '../utils/statusCodes';

interface Login {
  username: string;
  password: string;
}

const validadeUserLogin = (loginBody: Login) => Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'All fields must be filled',
    'string.email': 'Invalid email or password',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'All fields must be filled',
    'string.min': 'Invalid email or password',
  }),
}).validate(loginBody);

export default function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  const { error } = validadeUserLogin({ username, password });

  if (error) {
    return res.status(statusCodes.badRequest).json({ message: error.message });
  }

  return next();
}
