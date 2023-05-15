import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import { MatchData, TeamPerformance, TeamType } from '../interfaces/LeaderboardTypes';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
    private performance: TeamPerformance = {
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

  calculateTeamPerformance(team: TeamType, matchesPerTeam: MatchData[]) {
    this.performance.name = team.teamName;
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

  allHomeTeamsPerformance(allMatches: MatchData[], allTeams: TeamType[]) {
    const initialValue: TeamPerformance[] = [];
    const calculateAllTeamsPerformance = allTeams.reduce((acc, team) => {
      const matchesPerTeam = allMatches.filter(({ homeTeamId }) => homeTeamId === team.id);

      const performance = this.calculateTeamPerformance(team, matchesPerTeam);
      this.resetAtributePerformance();
      return [...acc, performance];
    }, initialValue);
    return calculateAllTeamsPerformance;
  }

  async getAllHomeTeamsPerformance() {
    const allMatches = await this.matchModel.getAllMatchesInProgressWithoutScope(false);
    const allTeams = await this.teamModel.getAllTeams();

    const allHomeTeamsPerformance = this.allHomeTeamsPerformance(allMatches, allTeams);

    return allHomeTeamsPerformance;
  }

  async resetAtributePerformance() {
    this.performance = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    };
  }
}
