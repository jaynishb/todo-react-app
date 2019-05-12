import { createSelector } from 'reselect';

export const selectTodo = ({ todo }) => todo;

export const selectTodoloading = createSelector(
  selectTodo,
  ({ loading }) => loading
);

export const selectTodos = createSelector(
  selectTodo,
  ({ data }) => data
);
export const selectTodoError = createSelector(
  selectTodo,
  ({ error }) => error
);
