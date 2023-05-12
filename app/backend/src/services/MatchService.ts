import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) { }

  async getAllMatches(inProgress: string | undefined) {
    if (inProgress !== undefined) {
      const matchInProgress = inProgress === 'true';
      const inProgressMatches = await this.matchModel.getAllMatchesInProgress(matchInProgress);
      return inProgressMatches;
    }
    const allMatches = await this.matchModel.getAllMatches();
    return allMatches;
  }

  async finishMatch(id: number) {
    await this.matchModel.finishMatch(id);
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const matchUpdated = await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return matchUpdated;
  }

  // async getMatchById(id: number) {
  //   const match = await this.matchModel.getMatchById(id);
  //   return match;
  // }
}
