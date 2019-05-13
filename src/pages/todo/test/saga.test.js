import { runSaga } from 'redux-saga';
import { addTodoData, editTodoData, deleteTodoData, getTodosData } from '../sagas';
import {
  addTodo as addTodoService,
  editTodo as editTodoService,
  deleteTodo as deleteTodoService,
  getAllTodo as getTodoService
} from '../../../services/todo';

import { queryLiterals } from '../../../store/query/queryLiterals';
import { MAP_TODO, GET_TODOS } from '../constants';

const { REQUEST, SUCCESS, ERROR } = queryLiterals(MAP_TODO);

const mockResponseData = {
  task: 'Call Obama',
  _id: 'efefergerg'
}; // mock response of add todo service
jest.mock('../../../services/todo', () => ({
  addTodo: jest.fn(),
  editTodo: jest.fn(),
  deleteTodo: jest.fn(),
  getAllTodo: jest.fn()
}));
addTodoService.mockImplementationOnce(() => mockResponseData).mockRejectedValueOnce(new Error());
editTodoService.mockImplementationOnce(() => mockResponseData).mockRejectedValueOnce(new Error());
deleteTodoService.mockImplementationOnce(() => mockResponseData).mockRejectedValueOnce(new Error());
getTodoService.mockImplementationOnce(() => mockResponseData).mockRejectedValueOnce(new Error());

async function recordSaga(saga, initialAction, state = {}) {
  const dispatched = [];

  await runSaga(
    {
      // Used to fulfill `put` effects.
      dispatch: action => dispatched.push(action),
      // Used to fulfill `select` and `getState` effects
      getState: () => state
    },
    saga,
    initialAction
  ).done;

  return {
    dispatched,
    actionsDispatched: dispatched.map(action => action.type)
  };
}
describe(' Add todo saga', () => {
  const task = 'Call Obama'; // mock task
  const todo = {
    task
  };
  it('should successfully add todo', async () => {
    const { actionsDispatched } = await recordSaga(addTodoData, {
      task
    });
    expect(addTodoService).toHaveBeenCalledWith(todo);
    expect(actionsDispatched).toEqual([REQUEST, GET_TODOS]);
  });

  it('should handle error from api call fails', async () => {
    const { actionsDispatched } = await recordSaga(addTodoData, {
      task
    });
    expect(addTodoService).toHaveBeenCalledWith(todo);
    expect(actionsDispatched).toEqual([REQUEST, ERROR]);
  });
});

describe('Edit todo saga', () => {
  const task = 'Call Trump'; // mock task
  const todo = {
    task
  };
  const id = 'sjdhbcjsbdc';
  it('should successfully edit todo', async () => {
    const { actionsDispatched } = await recordSaga(editTodoData, {
      todo,
      id
    });
    expect(editTodoService).toHaveBeenCalledWith({
      todo,
      id
    });
    expect(actionsDispatched).toEqual([REQUEST, GET_TODOS]);
  });

  it('should handle error from api call fails', async () => {
    const { actionsDispatched } = await recordSaga(editTodoData, {
      todo,
      id
    });
    expect(editTodoService).toHaveBeenCalledWith({
      todo,
      id
    });
    expect(actionsDispatched).toEqual([REQUEST, ERROR]);
  });
});

describe('Delete todo saga', () => {
  const id = 'sjdhbcjsbdc';
  it('should successfully delete todo', async () => {
    const { actionsDispatched } = await recordSaga(deleteTodoData, {
      id
    });
    expect(deleteTodoService).toHaveBeenCalledWith(id);
    expect(actionsDispatched).toEqual([REQUEST, GET_TODOS]);
  });

  it('should handle error from api call fails', async () => {
    const { actionsDispatched } = await recordSaga(deleteTodoData, {
      id
    });
    expect(deleteTodoService).toHaveBeenCalledWith(id);
    expect(actionsDispatched).toEqual([REQUEST, ERROR]);
  });
});

describe('Get All todo saga', () => {
  it('should successfully delete todo', async () => {
    const { actionsDispatched } = await recordSaga(getTodosData);
    expect(getTodoService).toHaveBeenCalled();
    expect(actionsDispatched).toEqual([REQUEST, SUCCESS]);
  });

  it('should handle error from api call fails', async () => {
    const { actionsDispatched } = await recordSaga(getTodosData);
    expect(getTodoService).toHaveBeenCalled();
    expect(actionsDispatched).toEqual([ERROR]);
  });
});
