import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { mockUserData, messageFieldsUnfilled, messageInvalidFields, mockUserDataInvalid } from './mocks/user.mock';
import User from '../database/models/User';

import { app } from '../app';
import ErrorLaunch from '../utils/ErrorLaunch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /login', () => {
  let modelUserStub: sinon.SinonStub;

  afterEach(() => {
    sinon.restore();
  });

  // Verifica se possível fazer um login com sucesso (token)
  // Verifica se não é possível fazer um login sem email
  // Verifica se não é possível fazer um login com email invalido
  // Verifica se não é possível fazer um login com email não cadastrado
  // Verifica se não é possível fazer um login sem senha
  // Verifica se não é possível fazer um login com senha errada

  describe('Testes do método POST de /login', () => {
    it('Verifica se não é possível fazer um login sem email', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          password: '123456',
        });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal(messageFieldsUnfilled);
    });
    it('Verifica se não é possível fazer um login com email invalido', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'teste.teste',
          password: '123456',
        });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal(messageInvalidFields);
    });
    it('Verifica se não é possível fazer um login com email não cadastrado', async () => {
      modelUserStub = sinon.stub(User, 'findOne')
        .resolves(mockUserDataInvalid as unknown as User);

      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'teste@teste.cm',
          password: '123456',
        });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal(messageInvalidFields);
    });
    it('Verifica se não é possível fazer um login sem senha', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'teste@teste.com',
        });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal(messageFieldsUnfilled);
    });
    it('Verifica se não é possível fazer um login com senha inválida', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'teste@teste',
          password: '123',
        });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal(messageInvalidFields);
    });
    it('Verifica se não é possível fazer um login com senha não cadastrada', async () => {
      modelUserStub = sinon.stub(User, 'findOne')
        .resolves(undefined);

      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'teste@teste',
          password: '123456',
        });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal(messageInvalidFields);
    });
    it('Verifica se possível fazer um login com sucesso', async () => {
      modelUserStub = sinon.stub(User, 'findOne')
        .resolves(mockUserData as unknown as User);

      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'teste@teste.com',
          password: 'secret_admin',
        });

      expect(response.status).to.be.equal(200);
      expect(response.body.token).not.to.be.empty;
    });
    it('Verifica erro 500', async () => {
      modelUserStub = sinon.stub(User, 'findOne')
        .throws(new Error('Internal Server Error'));

      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'teste@teste.com',
          password: 'secret_admin',
        });

      expect(response.status).to.be.equal(500);
      expect(response.body.message).to.be.equal('Internal Server Error');
    });
  });
});
