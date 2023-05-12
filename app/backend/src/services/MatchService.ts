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

  // async getMatchById(id: number) {
  //   const match = await this.matchModel.getMatchById(id);
  //   return match;
  // }
}
