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
      goalsBalance: 0,
      efficiency: 0,
    },
  ) { }

  setNotConditionalPerformanceData(team: TeamType, matchesPerTeam: MatchData[]) {
    this.performance.name = team.teamName;
    this.performance.totalGames = matchesPerTeam.length;
    this.performance.goalsBalance = this.performance.goalsFavor - this.performance.goalsOwn;
    this.performance.efficiency = Number(((
      this.performance.totalPoints / (this.performance.totalGames * 3)
    ) * 100).toFixed(2));
  }

  calculateTeamPerformance(team: TeamType, matchesPerTeam: MatchData[]) {
    for (let i = 0; i < matchesPerTeam.length; i += 1) {
      this.performance.goalsFavor += matchesPerTeam[i].homeTeamGoals;
      this.performance.goalsOwn += matchesPerTeam[i].awayTeamGoals;

      if (matchesPerTeam[i].homeTeamGoals > matchesPerTeam[i].awayTeamGoals) {
        this.performance.totalVictories += 1;
        this.performance.totalPoints += 3;
      } else if (matchesPerTeam[i].homeTeamGoals < matchesPerTeam[i].awayTeamGoals) {
        this.performance.totalLosses += 1;
      } else {
        this.performance.totalDraws += 1;
        this.performance.totalPoints += 1;
      }
    }
    this.setNotConditionalPerformanceData(team, matchesPerTeam);

    return this.performance;
  }

  allTeamsPerformance(allMatches: MatchData[], allTeams: TeamType[]) {
    const initialValue: TeamPerformance[] = [];
    const calculateAllTeamsPerformance = allTeams.reduce((acc, team) => {
      const matchesPerTeam = allMatches.filter(({ homeTeamId }) => homeTeamId === team.id);

      const performance = this.calculateTeamPerformance(team, matchesPerTeam);
      this.resetAtributePerformance();
      return [...acc, performance];
    }, initialValue);
    return calculateAllTeamsPerformance;
  }

  resetAtributePerformance() {
    this.performance = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  static orderTeamsByPerformance(teamsPerformance: TeamPerformance[]) {
    const resultOrdered = teamsPerformance.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints; // Ordena por totalPoints de forma decrescente
      } if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories; // Ordena por totalVictories de forma decrescente
      } if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance; // Ordena por goalsBalance de forma decrescente
      }
      return b.goalsFavor - a.goalsFavor; // Ordena por goalsFavor de forma decrescente
    });

    return resultOrdered;
  }

  async getAllHomeTeamsPerformance() {
    const allMatches = await this.matchModel.getAllMatchesInProgressWithoutScope(false);
    const allTeams = await this.teamModel.getAllTeams();

    const allHomeTeamsPerformance = this.allTeamsPerformance(allMatches, allTeams);

    const performanceOrdered = LeaderboardService.orderTeamsByPerformance(allHomeTeamsPerformance);

    return performanceOrdered;
  }

  async getAllAwayTeamsPerformance() {
    const allMatches = await this.matchModel.getAllMatchesInProgressWithoutScope(true);
    const allTeams = await this.teamModel.getAllTeams();

    const allHomeTeamsPerformance = this.allTeamsPerformance(allMatches, allTeams);

    const performanceOrdered = LeaderboardService.orderTeamsByPerformance(allHomeTeamsPerformance);

    return performanceOrdered;
  }
}
