import * as actions from '../actions';
import { ADD_TODO, GET_TODOS, DELETE_TODO, EDIT_TODO } from '../constants';

describe('todo actions', () => {
  it('should be defined', () => {
    expect(actions).toMatchSnapshot();
  });
  it('should create an action to add todo', () => {
    const task = 'Call obama';
    const expected = {
      type: ADD_TODO,
      task
    };
    expect(actions.addTodo(task)).toEqual(expected);
  });
  it('should create an action to get todo', () => {
    const expected = {
      type: GET_TODOS
    };
    expect(actions.getTodos()).toEqual(expected);
  });
  it('should create an action to delete todo', () => {
    const id = '123456789gfdxcvghj';
    const expected = {
      type: DELETE_TODO,
      id
    };
    expect(actions.deleteTodo(id)).toEqual(expected);
  });
  it('should create an action to edit todo', () => {
    const todo = 'Call trump';
    const id = '12345678dfghjkhg';
    const expected = {
      type: EDIT_TODO,
      todo,
      id
    };
    expect(actions.editTodo(todo, id)).toEqual(expected);
  });
});
