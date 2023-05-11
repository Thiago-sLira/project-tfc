const mockUserData = {
  id: 1,
  username: 'Testes dos Testes',
  role: 'Teste',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  email: 'teste@teste.com',
};

const mockUserDataInvalid = {
  id: 1,
  username: 'Testes dos Testes',
  role: 'Teste',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  email: 'teste@teste.com',
};

const messageFieldsUnfilled = 'All fields must be filled';

const messageInvalidFields = 'Invalid email or password';

export {
  mockUserData,
  messageFieldsUnfilled,
  messageInvalidFields,
  mockUserDataInvalid,
};
