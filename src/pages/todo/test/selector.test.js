import { selectTodo, selectTodoError, selectTodoloading, selectTodos } from '../selectors';

describe('Todo selector', () => {
  const mockState = {
    todo: {
      error: null,
      loading: false,
      data: []
    }
  };
  test('selectTodo', () => {
    const { todo } = mockState;
    expect(selectTodo(mockState)).toEqual(todo);
  });

  test('selectTodos', () => {
    const { data } = mockState.todo;
    expect(selectTodos(mockState)).toEqual(data);
  });

  test('selectTodoloading', () => {
    const { loading } = mockState.todo;
    expect(selectTodoloading(mockState)).toEqual(loading);
  });

  test('selectTodoError', () => {
    const { error } = mockState.todo;
    expect(selectTodoError(mockState)).toEqual(error);
  });
});
