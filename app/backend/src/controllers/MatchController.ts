import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  async getAllMatches(req: Request, res: Response) {
    const allMatches = await this.matchService.getAllMatches();
    res.status(200).json(allMatches);
  }

  // async getMatchById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const match = await this.teamService.getMatchById(Number(id));
  //   res.status(200).json(match);
  // }
}
