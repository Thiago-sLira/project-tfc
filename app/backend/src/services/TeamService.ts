import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) { }

  async getAllTeams() {
    const allTeams = await this.teamModel.getAllTeams();
    return allTeams;
  }
}
