import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const router = Router();

const userController = new UserController();
router.post('/', validateLogin, (req, res) => userController.userLogin(req, res));
router.get('/role', (req, res) => userController.userRole(req, res));

export default router;
