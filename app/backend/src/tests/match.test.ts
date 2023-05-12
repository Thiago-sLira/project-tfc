import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Match from '../database/models/Match';

import { app } from '../app';
import {
  mockAllMatches,
  mockAllMatchesInProgress,
  mockAllMatchesNotInProgress,
} from './mocks/match.mock';
import AuthJWT from '../utils/AuthJWT';

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
  describe('Testes do método PATCH com endpoint /matches/:id/finish', () => {
    it('Caso um token não seja enviado, retornar status 401', async () => {
      const response = await chai.request(app)
        .patch('/matches/41/finish');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found');
    });
    it('Caso um token sejá enviado, mas não seja válido, retornar status 401', async () => {
      const response = await chai.request(app)
        .patch('/matches/41/finish')
        .set('Authorization', 'invalid_token');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token');
    });
    it('Com um token válido, retorna a partida finalizada', async () => {
      modelMatchStub = sinon.stub(Match, 'update')
        .resolves([1]);

      const tokenJWT = new AuthJWT().generateToken({
        email: 'admin@admin.com',
        role: 'admin',
      });

      const response = await chai.request(app)
        .patch('/matches/41/finish')
        .set('Authorization', tokenJWT);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });
  describe('Testes do método PATCH com endpoint /matches/:id', () => {
    it('Caso um token não seja enviado, retornar status 401', async () => {
      const response = await chai.request(app)
        .patch('/matches/41');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found');
    });
    it('Caso um token sejá enviado, mas não seja válido, retornar status 401', async () => {
      const response = await chai.request(app)
        .patch('/matches/41')
        .set('Authorization', 'invalid_token');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token');
    });
    it('Com um token válido, retorna o resultado parcial da partida', async () => {
      modelMatchStub = sinon.stub(Match, 'update')
        .resolves([1]);

      const tokenJWT = new AuthJWT().generateToken({
        email: 'admin@admin.com',
        role: 'admin',
      });

      const response = await chai.request(app)
        .patch('/matches/41')
        .set('Authorization', tokenJWT);

      expect(response.status).to.be.equal(200);
      expect(response.body).not.to.be.empty;
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
