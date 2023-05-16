import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  async getAllHomeTeamsPerformance(_req: Request, res: Response) {
    const allHomeTeamsPerformance = await this.leaderboardService.getAllHomeTeamsPerformance();
    res.status(200).json(allHomeTeamsPerformance);
  }

  async getAllAwayTeamsPerformance(_req: Request, res: Response) {
    const allAwayTeamsPerformance = await this.leaderboardService.getAllAwayTeamsPerformance();
    res.status(200).json(allAwayTeamsPerformance);
  }

  async getOverallTeamsPerformance(_req: Request, res: Response) {
    const overallTeamsPerformance = await this.leaderboardService.getOverallTeamsPerformance();
    res.status(200).json(overallTeamsPerformance);
  }
}
