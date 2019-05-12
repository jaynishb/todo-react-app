import { ADD_TODO, GET_TODOS, DELETE_TODO, EDIT_TODO } from './constants';

export const addTodo = task => ({
  type: ADD_TODO,
  task
});

export const getTodos = () => ({
  type: GET_TODOS
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
});

export const editTodo = (todo, id) => ({
  type: EDIT_TODO,
  todo,
  id
});
