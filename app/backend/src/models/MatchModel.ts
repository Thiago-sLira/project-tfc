import Match from '../database/models/Match';

export default class MatchModel {
  constructor(private match = Match) {}

  async getAllMatches() {
    const matches = await this.match.findAll();
    return matches;
  }

  // async getMatchById(id: number) {
  //   const match = await this.match.findByPk(id);
  //   return match;
  // }
}
