import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import io from 'socket.io-client';
import { throttle } from 'lodash';

import reducers from './reducers';
import { setBoard, setTurnRemote } from './actions';
import { loadState, saveState } from './localStorage';
import { MODES } from './consts';

const socket = io(`:8765`, { transports: ['websocket'] });
const createStoreWithMiddleware = applyMiddleware(ReduxThunk.withExtraArgument(socket))(createStore);
const savedState = loadState();
export const store = createStoreWithMiddleware(reducers, savedState, window.devToolsExtension ? window.devToolsExtension() : f => f);

store.subscribe(throttle(() => {
  const state = store.getState();
  if (state.mode !== MODES.ONLINE_MULTIPLAYER) {
    saveState(state);
  }
}, 500));

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