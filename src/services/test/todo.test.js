import { getAllTodo, addTodo, deleteTodo, editTodo } from '../todo';
import request from '../instance';

jest.mock('../instance', () => jest.fn());

describe('todoService', () => {
  beforeEach(() => {
    request.mockReset();
  });
  test('addTodo', () => {
    const todo = {
      task: 'Call obama'
    };
    addTodo(todo);
    expect(request.mock.calls[0]).toMatchSnapshot();
  });
  test('getAllTodo', () => {
    getAllTodo();
    expect(request.mock.calls[0]).toMatchSnapshot();
  });
  test('deleteTodo', () => {
    const id = 'uygfcvbj';
    deleteTodo(id);
    expect(request.mock.calls[0]).toMatchSnapshot();
  });
  test('editTodo', () => {
    const params = {
      todo: {
        task: 'Call trump'
      },
      id: 'uygfcvbj'
    };
    editTodo(params);
    expect(request.mock.calls[0]).toMatchSnapshot();
  });
});
