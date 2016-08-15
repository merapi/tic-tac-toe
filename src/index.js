import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import ReduxThunk from 'redux-thunk';

import Root from './components/Root';
import SettingsContainer from './components/SettingsContainer';
import GameContainer from './components/GameContainer';
import reducers from './reducers';
import { setBoard, setTurnRemote } from './actions';

const socket = io(`:8765`, { transports: ['websocket'] });
const createStoreWithMiddleware = applyMiddleware(ReduxThunk.withExtraArgument(socket))(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);

socket.on('connect', () => {
  console.log('ws connected!');
});
socket.on('state', state => {
  console.log('state from ws', state);
  store.dispatch(setBoard(state.board));
  store.dispatch(setTurnRemote(state.turn));
});
socket.on('action', action => {
  console.log(action);
  store.dispatch(action);
});

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