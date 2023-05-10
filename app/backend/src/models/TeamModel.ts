import { Team } from '../database/models';

export default class TeamModel {
  private _teams = Team;

  constructor(teams: Team) {
    this._teams = teams;
  }

  // async createTeam(teamName: string) {
  //   const team = await this.create({ teamName });
  //   return team;
  // }

  // async getAllTeams() {
  //   const teams = await this.findAll();
  //   return teams;
  // }

  // async getTeamById(id: number) {
  //   const team = await this.findByPk(id);
  //   return team;
  // }

  // async updateTeam(id: number, teamName: string) {
  //   const team = await this.update({ teamName }, { where: { id } });
  //   return team;
  // }

  // async deleteTeam(id: number) {
  //   const team = await this.destroy({ where: { id } });
  //   return team;
  // }
}
