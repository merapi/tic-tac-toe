import {expect} from 'chai'

import { isWinner } from '../src/utils';
import { SIGNS } from '../src/consts';

describe('winner test', () => {

  describe('isWinner function', () => {

    it('should X win', () => {
      const board = [
        SIGNS.X, SIGNS.X, SIGNS.X,
        SIGNS.EMPTY, SIGNS.EMPTY, SIGNS.EMPTY,
        SIGNS.EMPTY, SIGNS.EMPTY, SIGNS.EMPTY
      ];

      expect(isWinner(board)).to.equal(SIGNS.X);
    });

    it('should draw', () => {
      const board = [
        SIGNS.X, SIGNS.O, SIGNS.O,
        SIGNS.O, SIGNS.X, SIGNS.X,
        SIGNS.X, SIGNS.O, SIGNS.O
      ];

      expect(isWinner(board)).to.be.false;
    });

  })

})