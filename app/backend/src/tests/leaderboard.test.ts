import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { mockAllTeams } from './mocks/team.mock';
import { mockAllMatchesNotInProgress } from './mocks/match.mock';
import {
  mockAllHomeTeamsPerformance,
  mockAllAwayTeamsPerformance,
  mockAllTeamsPerformanceOverrall,
} from './mocks/leaderboard.mock';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

import { app } from '../app';
// import AuthJWT from '../utils/AuthJWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /leaderboard', () => {
  let modelLeaderboardStub: sinon.SinonStub;

  afterEach(() => {
    sinon.restore();
  });

  describe('Testes do método GET de /leaderboard/home', () => {
    it('Verifica se é possível retornar todas as informações do desempenho dos times da casa', async () => {
      modelLeaderboardStub = sinon.stub(Match, 'findAll')
        .resolves(mockAllMatchesNotInProgress as unknown as Match[]);

      modelLeaderboardStub = sinon.stub(Team, 'findAll')
        .resolves(mockAllTeams as unknown as Team[]);

      const response = await chai.request(app)
        .get('/leaderboard/home')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllHomeTeamsPerformance);
    });
    it('Verifica se é possível retornar todas as informações do desempenho dos times visitantes', async () => {
      modelLeaderboardStub = sinon.stub(Match, 'findAll')
        .resolves(mockAllMatchesNotInProgress as unknown as Match[]);

      modelLeaderboardStub = sinon.stub(Team, 'findAll')
        .resolves(mockAllTeams as unknown as Team[]);

      const response = await chai.request(app)
        .get('/leaderboard/away')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllAwayTeamsPerformance);
    });
  });

});
