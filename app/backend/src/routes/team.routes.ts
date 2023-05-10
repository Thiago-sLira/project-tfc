import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

const teamController = new TeamController();
router.get('/', (req, res) => teamController.getAllTeams(req, res));

export default router;
