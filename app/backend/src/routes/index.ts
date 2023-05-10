import { Router } from 'express';
import teamRoutes from './team.routes';

const router = Router();

router.use('/teams', teamRoutes);

export default router;
