import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import Root from './components/Root';
import SettingsContainer from './components/SettingsContainer';
import GameContainer from './components/GameContainer';
import { store } from './store';

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={SettingsContainer}/>
    <Route path="settings" component={SettingsContainer}/>
    <Route path="game" component={GameContainer}>
      <Route path=":mode" component={GameContainer}/>
    </Route>
    <Route path="*" component={SettingsContainer}/>
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);