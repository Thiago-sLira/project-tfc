import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();
router.get('/home', (req, res) => leaderboardController.getAllHomeTeamsPerformance(req, res));
router.get('/away', (req, res) => leaderboardController.getAllAwayTeamsPerformance(req, res));
router.get('/', (req, res) => leaderboardController.getOverallTeamsPerformance(req, res));

export default router;
