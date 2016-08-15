import {expect} from 'chai'
import {shallow} from 'enzyme'
import React from 'react'
import Root from '../src/components/Root'

describe('app test', () => {

  describe('index test', () => {

    it('index text should contain "Starter"', () => {
      const component = shallow(<Root/>)

      expect(component.text()).to.contain('Starter')
    })

  })

})