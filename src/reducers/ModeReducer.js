import * as actions from '../actions';
import { ACTIONS, MODES } from '../consts';

const INITIAL_STATE = MODES.PASS_AND_PLAY;

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTIONS.SET_MODE: {
      return action.payload.mode
    }
    default: return state;
  }
}