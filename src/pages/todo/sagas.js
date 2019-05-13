import { call, put, takeEvery } from 'redux-saga/effects';
import {
  addTodo as addTodoService,
  getAllTodo as getTodosService,
  deleteTodo as deleteTodosService,
  editTodo as EditTodosService
} from '../../services/todo';

import { queryActions } from '../../store/query/queryLiterals';
import { getTodos } from './actions';
import { ADD_TODO, GET_TODOS, DELETE_TODO, EDIT_TODO, MAP_TODO } from './constants';

const { request, success, error } = queryActions(MAP_TODO);

export function* addTodoData({ task }) {
  try {
    const todo = {
      task
    };
    yield put(request());
    yield call(addTodoService, todo);
    yield put(getTodos());
  } catch (err) {
    yield put(
      error({
        error: err.message
      })
    );
  }
}

export function* getTodosData() {
  try {
    const { data } = yield call(getTodosService);
    yield put(request());
    yield put(
      success({
        data
      })
    );
  } catch (err) {
    yield put(
      error({
        error: err.message
      })
    );
  }
}

export function* deleteTodoData({ id }) {
  try {
    yield put(request());
    yield call(deleteTodosService, id);
    yield put(getTodos());
  } catch (err) {
    yield put(
      error({
        error: err.message
      })
    );
  }
}
export function* editTodoData({ todo, id }) {
  try {
    yield put(request());
    yield call(EditTodosService, {
      todo,
      id
    });
    yield put(getTodos());
  } catch (err) {
    yield put(
      error({
        error: err.message
      })
    );
  }
}

function* todoSaga() {
  yield takeEvery(ADD_TODO, addTodoData);
  yield takeEvery(GET_TODOS, getTodosData);
  yield takeEvery(DELETE_TODO, deleteTodoData);
  yield takeEvery(EDIT_TODO, editTodoData);
}

export default todoSaga;
