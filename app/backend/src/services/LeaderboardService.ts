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
    this.performance.efficiency = Number(
      ((this.performance.totalPoints / (this.performance.totalGames * 3)) * 100).toFixed(2),
    );
  }

  calculateTeamPerformance(team: TeamType, matchesPerTeam: MatchData[], isHomeTeam: boolean) {
    matchesPerTeam.forEach((match) => {
      this.performance.goalsFavor += isHomeTeam ? match.homeTeamGoals : match.awayTeamGoals;
      this.performance.goalsOwn += isHomeTeam ? match.awayTeamGoals : match.homeTeamGoals;

      if ((isHomeTeam && match.homeTeamGoals > match.awayTeamGoals)
        || (!isHomeTeam && match.awayTeamGoals > match.homeTeamGoals)) {
        this.performance.totalVictories += 1;
        this.performance.totalPoints += 3;
      } else if ((isHomeTeam && match.homeTeamGoals < match.awayTeamGoals)
        || (!isHomeTeam && match.awayTeamGoals < match.homeTeamGoals)) {
        this.performance.totalLosses += 1;
      } else {
        this.performance.totalDraws += 1;
        this.performance.totalPoints += 1;
      }
    });

    this.setNotConditionalPerformanceData(team, matchesPerTeam);

    return this.performance;
  }

  calculateTeamsPerformance(allMatches: MatchData[], allTeams: TeamType[], homeTeam: boolean) {
    return allTeams.map((team) => {
      const matchesPerTeam = allMatches.filter(({ homeTeamId, awayTeamId }) =>
        (homeTeam ? homeTeamId === team.id : awayTeamId === team.id));

      const performance = homeTeam
        ? this.calculateTeamPerformance(team, matchesPerTeam, true)
        : this.calculateTeamPerformance(team, matchesPerTeam, false);

      this.resetAtributePerformance();
      return performance;
    });
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

    const homeTeam = true;
    const allHomeTeamsPerformance = this.calculateTeamsPerformance(allMatches, allTeams, homeTeam);

    const performanceOrdered = LeaderboardService.orderTeamsByPerformance(allHomeTeamsPerformance);

    return performanceOrdered;
  }

  async getAllAwayTeamsPerformance() {
    const allMatches = await this.matchModel.getAllMatchesInProgressWithoutScope(false);
    const allTeams = await this.teamModel.getAllTeams();

    const homeTeam = false;
    const allAwayTeamsPerformance = this.calculateTeamsPerformance(allMatches, allTeams, homeTeam);

    const performanceOrdered = LeaderboardService.orderTeamsByPerformance(allAwayTeamsPerformance);

    return performanceOrdered;
  }
}
