import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { readStatusError } from '../helpers/errorType';

interface Login {
  email: string;
  password: string;
}

const validadeUserLogin = (loginBody: Login) => Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'string.empty': 'All fields must be filled',
  'any.required': 'All fields must be filled',
  'string.email': 'Invalid email or password',
  'string.min': 'Invalid email or password',
}).unknown(false).validate(loginBody);

export default function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  const { error } = validadeUserLogin({ email, password });

  if (error) {
    const { type } = error.details[0];
    console.log(type);
    const statusCode = readStatusError(type);
    return res.status(statusCode).json({ message: error.message });
  }

  return next();
}
