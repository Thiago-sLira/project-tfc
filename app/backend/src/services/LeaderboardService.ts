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

  async calculateTeamPerformance(team, matchesPerTeam) {
    this.performance.name = team.name;
    this.performance.totalGames = matchesPerTeam.length;

    for (let i = 0; i < matchesPerTeam.length; i += 1) {
      const match = matchesPerTeam[i];
      this.performance.goalsFavor += match.homeTeamGoals;
      this.performance.goalsOwn += match.awayTeamGoals;

      if (match.homeTeamGoals > match.awayTeamGoals) {
        this.performance.totalVictories += 1;
        this.performance.totalPoints += 3;
      } else if (match.homeTeamGoals < match.awayTeamGoals) {
        this.performance.totalLosses += 1;
      } else {
        this.performance.totalDraws += 1;
        this.performance.totalPoints += 1;
      }
    }

    return this.performance;
  }

  async allHomeTeamsPerformance(allMatches, allTeams) {
    const calculateAllTeamsPerformance = allTeams.reduce((acc, team) => {
      const matchesPerTeam = allMatches.filter(({ homeTeamId }) => homeTeamId === team.id);
      const performance = this.calculateTeamPerformance(team, matchesPerTeam);
      return [...acc, performance];
    }, []);
    return calculateAllTeamsPerformance;
  }

  async getAllHomeTeamsPerformance() {
    const allMatches = await this.matchModel.getAllMatchesInProgressWithoutScope(false);
    const allTeams = await this.teamModel.getAllTeams();

    const allHomeTeamsPerformance = this.allHomeTeamsPerformance(allMatches, allTeams);

    return allHomeTeamsPerformance;
  }
}
