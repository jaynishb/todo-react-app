import { persistCombineReducers } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import todoReducer from '../pages/todo/reducers';

export default (config, history) =>
  persistCombineReducers(config, {
    router: connectRouter(history),
    todo: todoReducer
  });
