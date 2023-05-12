import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Match from '../database/models/Match';

import { app } from '../app';
import {
  mockAllMatches,
  mockMatchCreated,
  dataMatchToCreate,
  invalidDataMatchToCreate,
  mockAllMatchesInProgress,
  mockAllMatchesNotInProgress,
  invalidTeamMatchToCreate,
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
  describe('Testes do método PATCH com endpoint /matches', () => {
    it('Caso um token não seja enviado, retornar status 401', async () => {
      const response = await chai.request(app)
        .post('/matches');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found');
    });
    it('Caso um token sejá enviado, mas não seja válido, retornar status 401', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'invalid_token');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token');
    });
    it('Com um token válido, retorna os dados da partida, com status 201', async () => {
      modelMatchStub = sinon.stub(Match, 'create')
        .resolves(mockMatchCreated as unknown as Match);

      const tokenJWT = new AuthJWT().generateToken({
        email: 'admin@admin.com',
        role: 'admin',
      });

      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', tokenJWT)
        .send(dataMatchToCreate);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(mockMatchCreated);
    });
    it('Caso sejam passados times iguais, deve retornar 422', async () => {
      modelMatchStub = sinon.stub(Match, 'create')
        .resolves(undefined);

      const tokenJWT = new AuthJWT().generateToken({
        email: 'admin@admin.com',
        role: 'admin',
      });

      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', tokenJWT)
        .send(invalidDataMatchToCreate);

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('It is not possible to create a match with two equal teams');
    });
    it('Caso seja passado um ou dois times inexistentes no banco de dados, deve retornar 404', async () => {
      modelMatchStub = sinon.stub(Match, 'findByPk')
        .resolves(undefined);

      const tokenJWT = new AuthJWT().generateToken({
        email: 'admin@admin.com',
        role: 'admin',
      });

      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', tokenJWT)
        .send(invalidTeamMatchToCreate);

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('There is no team with such id!');
    });
    // it('Caso um token não seja enviado, retornar status 401', async () => {
    //   const response = await chai.request(app)
    //     .post('/matches');

    //   expect(response.status).to.be.equal(401);
    //   expect(response.body.message).to.be.equal('Token not found');
    // });
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
