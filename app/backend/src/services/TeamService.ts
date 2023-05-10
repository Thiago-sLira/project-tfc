import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private _teamModel = new TeamModel()) { }

  async getAllTeams() {
    const allTeams = await this._teamModel.getAllTeams();
    return allTeams;
  }
}
