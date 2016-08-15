import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';

import Root from './components/Root';
import WelcomePage from './components/WelcomePage';
import reducers from './reducers';

const socket = io(`:8765`);
socket.on('connect', () => {
  console.log('ws connected!');
});

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

const routes = (
  <Route path="/" component={Root}>
    <Route path="welcome" component={WelcomePage}/>
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);