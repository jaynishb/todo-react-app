import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import createReducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
export const LOCALSTORAGE_KEY_PREFIX = 'demo-app/';

const configureStore = (initialState = {}, history) => {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

  const config = {
    storage,
    key: LOCALSTORAGE_KEY_PREFIX,
    whitelist: ['todo'],
    debug: true
  };

  const store = createStore(createReducer(config, history), initialState, composeEnhancers(...enhancers));
  store.runSaga = sagaMiddleware.run(sagas);
  return store;
};

export default configureStore;
