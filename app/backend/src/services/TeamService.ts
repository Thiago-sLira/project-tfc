import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) { }

  async getAllTeams() {
    const allTeams = await this.teamModel.getAllTeams();
    return allTeams;
  }

  async getTeamById(id: number) {
    const team = await this.teamModel.getTeamById(id);
    return team;
  }
}
