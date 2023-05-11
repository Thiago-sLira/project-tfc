import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) { }

  async getAllTeams(req: Request, res: Response) {
    const allTeams = await this.teamService.getAllTeams();
    res.status(200).json(allTeams);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getTeamById(Number(id));
    res.status(200).json(team);
  }
}
