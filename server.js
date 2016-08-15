import Server from 'socket.io';
import { createStore } from 'redux';
import reducers from './src/reducers';
import { ACTIONS, SIGNS } from './src/consts';
import { setPlayer, setBoard, setTurn } from './src/actions';
import { INITIAL_STATE } from './src/reducers/BoardReducer';

const port = process.env.PORT || 8765;
const io = new Server().listen(port);

let players = [];
const store = createStore(reducers);

store.subscribe(() => {
  console.log(store.getState());
  io.emit('state', store.getState());
})

io.on('connection', player => {

  players.push(player);
  console.log('new connection', player.id, ', count:', players.length);

  const playerSign = (players.length === 0 || players.length === 1 ? SIGNS.X : SIGNS.O);
  player.emit('action', setPlayer(player.id, playerSign));

  if (players.length === 2) {
    store.dispatch(setBoard(INITIAL_STATE));
    //send new game
    players.forEach(p => {
      p.emit('action', setBoard(INITIAL_STATE));
    })
  }

  player.on('action', action => {
    console.log('action', action);
    if (action.type == ACTIONS.SET_CELL) {

      const nextTurnSign = (action.payload.sign == SIGNS.X ? SIGNS.O : SIGNS.X);
      store.dispatch(setTurn(nextTurnSign));
    }
    store.dispatch(action);
  });
  player.on('disconnect', function () {
    players.splice(players.indexOf(player), 1);
    console.log('dropped connection', player.id, ', count:', players.length);
  });
})

console.log(`Server is running at port ${port}`);