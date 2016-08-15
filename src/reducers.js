import { combineReducers } from 'redux';

import BoardReducer from './reducers/BoardReducer';
import TurnReducer from './reducers/TurnReducer';
import ModeReducer from './reducers/ModeReducer';

const rootReducer = combineReducers({
  board: BoardReducer,
  turn: TurnReducer,
  mode: ModeReducer
});

export default rootReducer;