import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();
router.get('/', (req, res) => leaderboardController.getAllHomeTeamsPerformance(req, res));
// router.get('/:id', (req, res) => leaderboardController.getTeamById(req, res));

export default router;
