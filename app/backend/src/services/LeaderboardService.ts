import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
    
  ) { }

  

  

  async getAllHomeTeamsPerformance() {
    const allMatches = await this.matchModel.getAllMatchesInProgressWithoutScope(false);
    const allTeams = await this.teamModel.getAllTeams();

    const allHomeTeamsPerformance = this.allHomeTeamsPerformance(allMatches, allTeams);

    return allHomeTeamsPerformance;
  }
}
