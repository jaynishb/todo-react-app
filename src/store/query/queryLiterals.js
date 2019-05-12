export const queryLiterals = name => ({
  REQUEST: `${name}_REQUEST`,
  SUCCESS: `${name}_SUCCESS`,
  ERROR: `${name}_ERROR`
});

export const actionCreator = type => values => ({
  type,
  ...values
});

export const queryActions = name => {
  if (typeof name !== 'string' && !(name instanceof String)) {
    throw new Error('query action creators expect string for initialisation');
  }

  const { REQUEST, SUCCESS, ERROR } = queryLiterals(name);

  return {
    request: actionCreator(REQUEST),
    success: actionCreator(SUCCESS),
    error: actionCreator(ERROR)
  };
};
