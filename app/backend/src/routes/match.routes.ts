import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import validateToken from '../middlewares/validateToken';

const router = Router();

const matchController = new MatchController();
router.get('/', (req, res) => matchController.getAllMatches(req, res));
router.patch('/:id/finish', validateToken, (req, res) => matchController.finishMatch(req, res));
router.patch('/:id', validateToken, (req, res) => matchController.updateMatch(req, res));
router.post('/', validateToken, (req, res) => matchController.createMatch(req, res));
// router.get('/:id', (req, res) => matchController.getTeamById(req, res));

export default router;
