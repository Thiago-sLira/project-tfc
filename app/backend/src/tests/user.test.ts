import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { mockUserData, messageFieldsUnfilled, messageInvalidFields, mockUserDataInvalid } from './mocks/user.mock';
import User from '../database/models/User';

import { app } from '../app';
import AuthJWT from '../utils/AuthJWT';

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
  // Verifica se não é possível retornar um objeto com o tipo usuário sem um token
  // Verifica se não é possível retornar um objeto com o tipo usuário com um token inválido
  // Verifica se é possível retornar um objeto com um token válido

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
      expect(response.body.message).to.be.equal('Erro inesperado!');
    });
  });
  describe('Testes do método GET de /login/role', () => {
    it('Caso um token não seja enviado, retornar status 401', async () => {
      const response = await chai.request(app)
        .get('/login/role');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found');
    });
    it('Caso um token sejá enviado, mas não seja válido, retornar status 401', async () => {
      const response = await chai.request(app)
        .get('/login/role')
        .set('Authorization', 'invalid_token');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token');
    });
    it('Caso o token seja enviado, e seja válido, retornar status 200', async () => {
      // modelUserStub = sinon.stub(AuthJWT, 'validateToken')
      //   .returns({
      //     email: 'admin@admin.com',
      //     role: 'admin',
      //   });
      const tokenJWT = new AuthJWT().generateToken({
        email: 'admin@admin.com',
        role: 'admin',
        });

      const response = await chai.request(app)
        .get('/login/role')
        .set('Authorization', tokenJWT);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ "role": "admin" });
    });
  });
});
