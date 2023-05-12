import { Router } from 'express';
import teamRoutes from './team.routes';
import userRoutes from './user.routes';
import matchRoutes from './match.routes';

const router = Router();

router.use('/teams', teamRoutes);
router.use('/login', userRoutes);
router.use('/matches', matchRoutes);

export default router;
