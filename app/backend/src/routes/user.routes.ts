import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const router = Router();

const userController = new UserController();
router.post('/', validateLogin, (req, res) => userController.userLogin(req, res));
router.get('/role', validateToken, (req, res) => UserController.userRole(req, res));

export default router;
