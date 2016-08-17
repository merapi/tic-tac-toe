import Server from 'socket.io';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';
import { ACTIONS, SIGNS } from './src/consts';
import { setPlayer, setBoard, setTurn, makeMove } from './src/actions';
import { INITIAL_STATE } from './src/reducers/BoardReducer';

const port = process.env.PORT || 8765;
const io = new Server().listen(port);

let players = [];
let signs = {};
const store = createStore(reducers, applyMiddleware(ReduxThunk));

store.subscribe(() => {
  io.emit('state', store.getState());
});

io.on('connection', player => {
  const xFree = Object.keys(signs).find(key => signs[key] === SIGNS.X);
  const playerSign = (xFree === undefined ? SIGNS.X : SIGNS.O);
  signs[player.id] = playerSign;
  console.log('pl', players.length, ' => ', playerSign);

  players.push(player);
  console.log('#CONNECTED:', player.id, ', count:', players.length);
  
  player.emit('action', setPlayer(player.id, playerSign));

  if (players.length === 2) {
    store.dispatch(setBoard(INITIAL_STATE));
    //send new game
    players.forEach(p => {
      console.log('#TWO PLAYERS: reset boards');
      p.emit('action', setBoard(INITIAL_STATE));
    });
  }

  player.on('action', action => {
    console.log('#ACTION:', action);
    
    if (action.type == ACTIONS.SET_CELL) {
      store.dispatch(makeMove(action.payload.index));
    }
    if (action.type == ACTIONS.SET_BOARD) {
      store.dispatch(action);
    }
  });

  player.on('disconnect', function () {
    players.splice(players.indexOf(player), 1);
    delete signs[player.id];
    console.log('#DROPPED:', player.id, ', count:', players.length);
  });
});

console.log(`Server is running at port ${port}`);