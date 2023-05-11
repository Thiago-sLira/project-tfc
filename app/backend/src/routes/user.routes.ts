import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const router = Router();

const userController = new UserController();
router.post('/', validateLogin, (req, res) => userController.userLogin(req, res));

export default router;
