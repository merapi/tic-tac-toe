import * as actions from '../actions';
import { ACTIONS, SIGNS } from '../consts';

export const INITIAL_STATE = new Array(9).fill(SIGNS.EMPTY);

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTIONS.SET_BOARD: {
      return action.payload.board
    }
    case ACTIONS.SET_CELL: {
      let newState = state.slice();
      const { index, sign } = action.payload;
      newState[index] = sign;
      return newState;
    }
    default: return state;
  }
}