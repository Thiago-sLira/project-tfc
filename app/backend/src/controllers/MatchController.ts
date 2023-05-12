import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const allMatches = await this.matchService.getAllMatches(inProgress as string | undefined);
    res.status(200).json(allMatches);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  // async getMatchById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const match = await this.teamService.getMatchById(Number(id));
  //   res.status(200).json(match);
  // }
}
