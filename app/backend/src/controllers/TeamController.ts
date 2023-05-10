import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private _teamService = new TeamService()) { }

  async getAllTeams(req: Request, res: Response) {
    const allTeams = await this._teamService.getAllTeams();
    res.status(200).json(allTeams);
  }
}
