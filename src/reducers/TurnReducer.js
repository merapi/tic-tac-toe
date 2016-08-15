import * as actions from '../actions';
import { ACTIONS, SIGNS } from '../consts';

const INITIAL_STATE = {
  count: 1,
  sign: SIGNS.X,
  winner: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTIONS.SET_BOARD:
    case ACTIONS.NEW_GAME: {
      return { ...state, winner: null, count: 1 }
    }
    case ACTIONS.SET_WINNER: {
      return { ...state, winner: action.payload.sign }
    }
    case ACTIONS.SET_TURN: {
      const newCount = state.count + 1;
      return { ...state, sign: action.payload.sign, count: newCount }
    }
    default: return state;
  }
}