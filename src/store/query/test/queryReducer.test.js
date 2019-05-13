import { initialState, createQueryReducer } from '../queryReducer';
import { queryLiterals } from '../queryLiterals';

const name = 'TEST';

describe('query reducer creator', () => {
  it('should have a well defined initial state for query reducer creation.', () => {
    expect(initialState).toMatchSnapshot();
  });

  it('should create query reducers which use the default initial state if no state is defined.', () => {
    const expected = initialState;
    const actual = createQueryReducer(name);

    expect(actual(undefined, {})).toEqual(expected);
  });
});

describe('should handle all actions', () => {
  const mockQueryLiterals = jest.fn();
  mockQueryLiterals.mockImplementation(() => queryLiterals(name));
  const { REQUEST, SUCCESS, ERROR } = mockQueryLiterals();
  it('should only handle REQUEST, SUCCESS, ERROR actions', () => {
    const sut = createQueryReducer(name);

    const expected = initialState;
    const actual = sut(initialState, {
      type: 'ANY_OTHER_ACTION_TYPE'
    });

    expect(actual).toEqual(expected);
  });

  it('should have a case for REQUEST action & handle this case correctly.', () => {
    const sut = createQueryReducer(name);

    const expected = {
      ...initialState,
      loading: true,
      error: null
    };
    const actual = sut(initialState, {
      type: REQUEST
    });

    expect(actual).toEqual(expected);
  });

  it('should have a case for SUCCESS action & handle this case correctly.', () => {
    const sut = createQueryReducer(name);

    const data = ['value1', 'value2'];

    const expected = {
      ...initialState,
      data,
      error: null,
      loading: false
    };
    const actual = sut(initialState, {
      type: SUCCESS,
      data
    });

    expect(actual).toEqual(expected);
  });

  it('should have a case for ERROR action & handle this case correctly.', () => {
    const sut = createQueryReducer(name);

    const error = {
      msg: 'error'
    };

    const expected = {
      ...initialState,
      error,
      loading: false
    };
    const actual = sut(initialState, {
      type: ERROR,
      error
    });

    expect(actual).toEqual(expected);
  });
});
