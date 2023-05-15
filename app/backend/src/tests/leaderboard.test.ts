import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { mockAllTeams } from './mocks/team.mock';
import { mockAllMatchesNotInProgress } from './mocks/match.mock';
import { mockAllTeamsPerformance } from './mocks/leaderboard.mock';
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
      expect(response.body).to.be.deep.equal(mockAllTeamsPerformance);
    });
    // it('Verifica se não é possível fazer um login com email invalido', async () => {
    //   const response = await chai.request(app)
    //     .post('/login')
    //     .send({
    //       email: 'teste.teste',
    //       password: '123456',
    //     });

    //   expect(response.status).to.be.equal(401);
    //   expect(response.body.message).to.be.equal(messageInvalidFields);
    // });
    // it('Verifica se não é possível fazer um login com email não cadastrado', async () => {
    //   modelLeaderboardStub = sinon.stub(User, 'findOne')
    //     .resolves(mockUserDataInvalid as unknown as User);

    //   const response = await chai.request(app)
    //     .post('/login')
    //     .send({
    //       email: 'teste@teste.cm',
    //       password: '123456',
    //     });

    //   expect(response.status).to.be.equal(401);
    //   expect(response.body.message).to.be.equal(messageInvalidFields);
    // });
  });

});
