import MatchModel from '../models/MatchModel';

export default class LeaderboardService {
  constructor(private matchModel = new MatchModel()) { }

  async getAllHomeTeamsPerformance() {
    const allMatches = await this.matchModel.getAllMatchesInProgress(false);
    return 'oi';
  }
}
