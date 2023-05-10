import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

const teamController = new TeamController();


export default router;