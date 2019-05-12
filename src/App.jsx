import dotenv from 'dotenv';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router';
import { NotificationContainer } from 'react-notifications';
import configureStore from './store';
import Todo from './pages/todo';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

const history = createBrowserHistory();
const store = configureStore({}, history);

dotenv.config();

const App = () => {
  useEffect(() => {
    persistStore(store, null);
  }, []);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <NotificationContainer />
        <Switch>
          <Route exact path="/">
            <Redirect to="/todo" />
          </Route>
          <Route path="/todo" component={Todo} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
