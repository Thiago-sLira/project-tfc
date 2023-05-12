import { Router } from 'express';
import MatchController from '../controllers/TeamController';

const router = Router();

const matchController = new MatchController();
router.get('/', (req, res) => matchController.getAllMatches(req, res));
// router.get('/:id', (req, res) => matchController.getTeamById(req, res));

export default router;
