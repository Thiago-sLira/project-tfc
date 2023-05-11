import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { mockUserData } from './mocks/user.mock';
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
    it('Verifica se possível fazer um login com sucesso', async () => {
      before(() => {
        modelUserStub = sinon.stub(User, 'findOne')
          .resolves(mockUserData as unknown as User);
      });
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'teste@teste.com',
          password: '123456',
        });

      expect(response.status).to.be.equal(200);
      expect(response.body.token).not.to.be.empty;
    });
    // it('Verifica se não é possível fazer um login sem email', async () => {
    //   const response = await chai.request(app).get('/teams');

    //   expect(response.status).to.be.equal(200);
    //   expect(response.body).to.be.deep.equal(mockAllTeams);
    // });
    // it('Verifica se não é possível fazer um login com email invalido', async () => {
    //   const response = await chai.request(app).get('/teams');

    //   expect(response.status).to.be.equal(200);
    //   expect(response.body).to.be.deep.equal(mockAllTeams);
    // });
    // it('Verifica se não é possível fazer um login com email não cadastrado', async () => {
    //   const response = await chai.request(app).get('/teams');

    //   expect(response.status).to.be.equal(200);
    //   expect(response.body).to.be.deep.equal(mockAllTeams);
    // });
    // it('Verifica se não é possível fazer um login sem senha', async () => {
    //   const response = await chai.request(app).get('/teams');

    //   expect(response.status).to.be.equal(200);
    //   expect(response.body).to.be.deep.equal(mockAllTeams);
    // });
    // it('Verifica se não é possível fazer um login com senha errada', async () => {
    //   const response = await chai.request(app).get('/teams');

    //   expect(response.status).to.be.equal(200);
    //   expect(response.body).to.be.deep.equal(mockAllTeams);
    // });
  });
});
