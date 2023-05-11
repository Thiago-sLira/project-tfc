import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { mockAllTeams, mockOneTeam } from './mocks/team.mock';
import Team from '../database/models/Team';

import { app } from '../app';
// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /teams', () => {
  let modelTeamStub: sinon.SinonStub;

  afterEach(() => {
    modelTeamStub.restore();
  });

  describe('Testes do método GET', () => {
    beforeEach(() => {
      modelTeamStub = sinon.stub(Team, 'findAll');
    });

    it('Retorna todos os times', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllTeams);
    });
  });
  describe('Testes do método GET por id', () => {
    beforeEach(() => {
      modelTeamStub = sinon.stub(Team, 'findOne');
    });
  
    it('Retorna o time pelo id', async () => {
      const response = await chai.request(app).get('/teams/16');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockOneTeam);
    });
  });

});
