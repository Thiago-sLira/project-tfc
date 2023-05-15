import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
    private performance = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    },
  ) { }

  

  

  async getAllHomeTeamsPerformance() {
    const allMatches = await this.matchModel.getAllMatchesInProgressWithoutScope(false);
    const allTeams = await this.teamModel.getAllTeams();

    const allHomeTeamsPerformance = this.allHomeTeamsPerformance(allMatches, allTeams);

    return allHomeTeamsPerformance;
  }
}
