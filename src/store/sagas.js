import { all } from 'redux-saga/effects';
import todoSaga from '../pages/todo/sagas';

export default function* rootSaga() {
  return yield all([todoSaga()]);
}
