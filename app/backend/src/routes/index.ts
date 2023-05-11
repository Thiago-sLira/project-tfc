import { Router } from 'express';
import teamRoutes from './team.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/teams', teamRoutes);
router.use('/users', userRoutes);

export default router;
