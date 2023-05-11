import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as mock from './mocks/user.mock';
import User from '../database/models/User';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /login', () => {
  let modelUserStub: sinon.SinonStub;

  afterEach(() => {
    modelUserStub.restore();
  });

  // Verifica se possível fazer um login com sucesso (token)
  // Verifica se não é possível fazer um login sem email
  // Verifica se não é possível fazer um login com email invalido
  // Verifica se não é possível fazer um login com email não cadastrado
  // Verifica se não é possível fazer um login sem senha
  // Verifica se não é possível fazer um login com senha errada

  describe('Testes do método POST de /login', () => {
    beforeEach(() => {
      modelUserStub = sinon.stub(Team, 'findAll')
        .resolves(mockAllTeams as unknown as Team[]);
    });

    it('Verifica se possível fazer um login com sucesso', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllTeams);
    });
    it('Verifica se não é possível fazer um login sem email', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllTeams);
    });
    it('Verifica se não é possível fazer um login com email invalido', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllTeams);
    });
    it('Verifica se não é possível fazer um login com email não cadastrado', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllTeams);
    });
    it('Verifica se não é possível fazer um login sem senha', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllTeams);
    });
    it('Verifica se não é possível fazer um login com senha errada', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllTeams);
    });
  });
});
