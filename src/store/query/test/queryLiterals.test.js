import { queryLiterals, queryActions, actionCreator } from '../queryLiterals';

const name = 'TEST';

describe('query Actions', () => {
  it('should throw an error if called without a string argument', () => {
    expect(() => {
      queryActions();
    }).toThrow();
  });

  it('should return proper query action creators if initialised correctly', () => {
    const mockQueryLiterals = jest.fn();
    mockQueryLiterals.mockImplementation(() => queryLiterals(name));
    const { REQUEST, SUCCESS, ERROR } = mockQueryLiterals();

    const mockActionCreator = jest.fn();
    mockActionCreator.mockImplementation(actionCreator);

    const values = {
      value1: 'value1',
      value2: 1,
      value3: true
    };

    const expected = {
      request: mockActionCreator(REQUEST),
      success: mockActionCreator(SUCCESS),
      error: mockActionCreator(ERROR)
    };

    const actual = queryActions('TEST');
    expect(actual.request(values)).toEqual(expected.request(values));
    expect(actual.success(values)).toEqual(expected.success(values));
    expect(actual.error(values)).toEqual(expected.error(values));
  });
});

describe('query literals creator', () => {
  it('should create correct literals', () => {
    expect(queryLiterals(name)).toMatchSnapshot();
  });
});
