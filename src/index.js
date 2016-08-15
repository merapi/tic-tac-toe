import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';

import Root from './components/Root';
import SettingsContainer from './components/SettingsContainer';
import GameContainer from './components/GameContainer';
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
    <IndexRoute component={SettingsContainer}/>
    <Route path="settings" component={SettingsContainer}/>
    <Route path="game" component={GameContainer}/>
    <Route path="*" component={SettingsContainer}/>
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);