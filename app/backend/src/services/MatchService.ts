import { CreateMatch } from '../interfaces/MatchTypes';
import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) { }

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

  async createMatch(match: CreateMatch) {
    const homeTeam = await this.teamModel.getTeamById(match.homeTeamId);
    const awayTeam = await this.teamModel.getTeamById(match.awayTeamId);

    const matchCreated = await this.matchModel.createMatch(match);
    return matchCreated;
  }

  // async getMatchById(id: number) {
  //   const match = await this.matchModel.getMatchById(id);
  //   return match;
  // }
}
