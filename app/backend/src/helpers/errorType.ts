const typesErrors: { [key: string]: number } = {
  'string.empty': 400,
  'any.required': 400,
  'string.email': 401,
  'string.min': 401,
};

const readStatusError = (type: string) => typesErrors[type] || 500;

const errorType = {};

export {
  readStatusError,
  errorType,
};
