import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) { }

  async getAllMatches() {
    const allMatches = await this.matchModel.getAllMatches();
    return allMatches;
  }

  // async getMatchById(id: number) {
  //   const match = await this.matchModel.getMatchById(id);
  //   return match;
  // }
}
