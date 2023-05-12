import { Request } from 'express';
import { LoginRole } from './LoginRole';

export default interface IRequest extends Request {
  user?: LoginRole
}
