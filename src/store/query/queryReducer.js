import { queryLiterals } from './queryLiterals';

export const initialState = {
  loading: false,
  error: null,
  data: []
};

export const createQueryReducer = name => {
  return function queryReducer(state = initialState, action) {
    const { REQUEST, SUCCESS, ERROR } = queryLiterals(name);
    const { data, error, type } = action;
    switch (type) {
      case REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case SUCCESS:
        return {
          ...state,
          loading: false,
          data
        };
      case ERROR:
        return {
          ...state,
          loading: false,
          error
        };
      default:
        return state;
    }
  };
};
