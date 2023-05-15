import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  async getAllHomeTeamsPerformance(_req: Request, res: Response) {
    const allHomeTeamsPerformance = await this.leaderboardService.getAllHomeTeamsPerformance();
    res.status(200).json(allHomeTeamsPerformance);
  }
}
