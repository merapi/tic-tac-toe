import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../src/actions';
import { ACTIONS, SIGNS, MODES } from '../src/consts';
import { INITIAL_STATE } from '../src/reducers/BoardReducer';

describe('actions', () => {

  describe('board', () => {

    it('should create an action to set cell', () => {
      const index = 4;
      const sign = SIGNS.O;
      const expectedAction = {
        type: ACTIONS.SET_CELL,
        payload: { index, sign }
      };

      expect(actions.setCell(index, sign)).to.deep.equal(expectedAction);
    });

    it('should create an action to set board', () => {
      const board = INITIAL_STATE;
      const expectedAction = {
        type: ACTIONS.SET_BOARD,
        payload: { board }
      };

      expect(actions.setBoard(board)).to.deep.equal(expectedAction);
    });

    describe('newGame thunk', () => {

      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);

      it('should dispatch SET_BOARD on newGame()', () => {
        const board = INITIAL_STATE;
        const store = mockStore({});
        const expectedActions = [
          {
            type: ACTIONS.SET_BOARD,
            payload: { board }
          }
        ];

        store.dispatch(actions.newGame());

        expect(store.getActions()).to.deep.equal(expectedActions);
      });

    })

  });

  describe('mode', () => {

    it('should create an action to set mode', () => {
      const mode = MODES.ONLINE_MULTIPLAYER;
      const expectedAction = {
        type: ACTIONS.SET_MODE,
        payload: { mode }
      };

      expect(actions.setMode(mode)).to.deep.equal(expectedAction);
    });

  });

});