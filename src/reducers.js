import { combineReducers } from 'redux';

import BoardReducer from './reducers/BoardReducer';
import TurnReducer from './reducers/TurnReducer';
import PlayerReducer from './reducers/PlayerReducer';

const rootReducer = combineReducers({
  board: BoardReducer,
  turn: TurnReducer,
  player: PlayerReducer
});

export default rootReducer;