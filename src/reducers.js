import { combineReducers } from 'redux';

import BoardReducer from './reducers/BoardReducer';
import TurnReducer from './reducers/TurnReducer';
import ModeReducer from './reducers/ModeReducer';
import PlayerReducer from './reducers/PlayerReducer';

const rootReducer = combineReducers({
  board: BoardReducer,
  turn: TurnReducer,
  mode: ModeReducer,
  player: PlayerReducer
});

export default rootReducer;