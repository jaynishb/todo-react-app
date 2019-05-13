import instance from './instance';
import { TODO_API_ENDPOINT } from './serviceConstants';

export const addTodo = data => {
  const options = {
    method: 'POST',
    data
  };
  return instance(`${TODO_API_ENDPOINT}`, options);
};

export const getAllTodo = () => {
  const options = {
    method: 'GET'
  };
  return instance(`${TODO_API_ENDPOINT}`, options);
};

export const deleteTodo = id => {
  const options = {
    method: 'DELETE',
    data: id
  };
  return instance(`${TODO_API_ENDPOINT}/${id}`, options);
};

export const compeltedTodo = id => {
  const options = {
    method: 'PUT',
    data: {
      completedAt: new Date().now()
    }
  };
  return instance(`${TODO_API_ENDPOINT}/${id}`, options);
};

export const editTodo = ({ todo, id }) => {
  const options = {
    method: 'PUT',
    data: todo
  };
  return instance(`${TODO_API_ENDPOINT}/${id}`, options);
};
