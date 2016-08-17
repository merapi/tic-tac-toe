import { expect } from 'chai';

import { SIGNS, MODES } from '../src/consts';
import * as actions from '../src/actions';
import BoardReducer, { INITIAL_STATE } from '../src/reducers/BoardReducer';
import ModeReducer from '../src/reducers/ModeReducer';

describe('reducers', () => {

  describe('board', () => {

    it('handle SET_BOARD', () => {
      const initState = [];
      const finalState = INITIAL_STATE;

      const newState = BoardReducer(initState, actions.setBoard(INITIAL_STATE));

      expect(newState).to.deep.equal(finalState);
      expect(initState).to.deep.equal(initState);
    });

    it('handle SET_CELL', () => {
      const initState = INITIAL_STATE;
      const finalState = INITIAL_STATE.map((sign, index) => {
        if (index === 0) return SIGNS.X;
        return sign;
      });

      const newState = BoardReducer(initState, actions.setCell(0, SIGNS.X));

      expect(newState).to.deep.equal(finalState);
      expect(initState).to.deep.equal(initState);
    });

    it('handle 3*SET_CELL', () => {
      const initState = INITIAL_STATE;
      const finalState = INITIAL_STATE.map((sign, index) => {
        if (index === 0) return SIGNS.X;
        if (index === 3) return SIGNS.O;
        if (index === 6) return SIGNS.X;
        return sign;
      });

      const runActions = [
        actions.setCell(0, SIGNS.X),
        actions.setCell(3, SIGNS.O),
        actions.setCell(6, SIGNS.X)
      ];
      const newState = runActions.reduce(BoardReducer, initState);

      expect(newState).to.deep.equal(finalState);
      expect(initState).to.deep.equal(initState);
    });

  });

  describe('mode', () => {

    it('handle 3*SET_MODE', () => {
      const initState = MODES.PASS_AND_PLAY;
      const finalState = MODES.ONLINE_MULTIPLAYER;

      const runActions = [
        actions.setMode(MODES.VERSUS_BOT),
        actions.setMode(MODES.PASS_AND_PLAY),
        actions.setMode(MODES.ONLINE_MULTIPLAYER)
      ];
      const newState = runActions.reduce(ModeReducer, initState);

      expect(newState).to.deep.equal(finalState);
      expect(initState).to.deep.equal(initState);
    });

  });

});