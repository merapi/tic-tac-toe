import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';

import Root from './components/Root';
import SettingsPage from './components/SettingsPage';
import GamePage from './components/GamePage';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';

const socket = io(`:8765`);
socket.on('connect', () => {
  console.log('ws connected!');
});

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);

const routes = (
  <Route path="/" component={Root}>
    <Route path="settings" component={SettingsPage}/>
    <Route path="game" component={GamePage}/>
    <Route path="*" component={SettingsPage}/>
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);