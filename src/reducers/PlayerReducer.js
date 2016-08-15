import * as actions from '../actions';
import { ACTIONS, MODES } from '../consts';

const INITIAL_STATE = {};
//{ id: '...', sign: 'X'}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTIONS.SET_PLAYER: {
      return action.payload
    }
    default: return state;
  }
}