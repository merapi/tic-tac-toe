import {expect} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import * as CONSTS from '../src/consts';
import Cell from '../src/components/Cell';

describe('Cell', () => {

  describe('props -> render', () => {

    it('should have class "cell" and "sign-x"', () => {
      const component = shallow(<Cell sign={CONSTS.SIGNS.X} />);

      expect(component).to.have.className('cell');
      expect(component).to.have.className('sign-x');
    });

    it('should have class "cell" and "sign-o"', () => {
      const component = shallow(<Cell sign={CONSTS.SIGNS.O} />);

      expect(component).to.have.className('cell');
      expect(component).to.have.className('sign-o');
    });

    it('should have class "cell" and "sign-empty"', () => {
      const component = shallow(<Cell sign={CONSTS.SIGNS.EMPTY} />);

      expect(component).to.have.className('cell');
      expect(component).to.have.className('sign-empty');
    });

  });

  describe('click handlers', () => {

    it('click should return index 3', () => {
      const onClick = sinon.spy();
      const component = shallow(<Cell index={3} onClick={onClick} />);
      
      component.simulate('click');

      expect(onClick.alwaysCalledWithExactly(3)).to.be.true;
    });

  });

});