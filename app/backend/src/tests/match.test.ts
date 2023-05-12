import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Match from '../database/models/Match';

import { app } from '../app';
import { mockAllMatches, mockAllMatchesInProgress, mockAllMatchesNotInProgress } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /matches', () => {
  let modelMatchStub: sinon.SinonStub;

  afterEach(() => {
    sinon.restore();
  });

  describe('Testes do método GET', () => {
    it('Retorna todas as partidas', async () => {
      modelMatchStub = sinon.stub(Match, 'findAll')
        .resolves(mockAllMatches as unknown as Match[]);

      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllMatches);
    });
  });
  describe('Testes do método GET com query', async () => {
    it('Retorna todas as partidas que estão em progresso', async () => {
      modelMatchStub = sinon.stub(Match, 'findAll')
        .resolves(mockAllMatchesInProgress as unknown as Match[]);

      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllMatchesInProgress);
    });
  });
  describe('Testes do método GET com query', async () => {
    it('Retorna todas as partidas que não estão em progresso', async () => {
      modelMatchStub = sinon.stub(Match, 'findAll')
        .resolves(mockAllMatchesNotInProgress as unknown as Match[]);

      const response = await chai.request(app).get('/matches?inProgress=false');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllMatchesNotInProgress);
    });
  });
  // describe('Testes do método GET por id', () => {
  //   it('Retorna o time pelo id', async () => {
  //     modelMatchStub = sinon.stub(Match, 'findOne')
  //       .resolves(mockOneMatch as unknown as Match);

  //     const response = await chai.request(app).get('/matches/1');

  //     expect(response.status).to.be.equal(200);
  //     expect(response.body).to.be.deep.equal(mockOneMatch);
  //   });
  // });
});
