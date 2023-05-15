// LeaderboardService

import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(private leaderboardModel = new LeaderboardModel()) { }

  async getAllHomeTeamsPerformance() {
    const allHomeTeamsPerformance = await this.leaderboardModel.getAllHomeTeamsPerformance();
    return allHomeTeamsPerformance;
  }
}
