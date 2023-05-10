import Team from '../database/models/Team';

export default class TeamModel {
  constructor(private team = Team) {}

  // async createTeam(teamName: string) {
  //   const team = await this.create({ teamName });
  //   return team;
  // }

  async getAllTeams() {
    const teams = await this.team.findAll();
    return teams;
  }

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
