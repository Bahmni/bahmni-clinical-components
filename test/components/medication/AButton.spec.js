import { shallow } from 'enzyme';
import React from 'react';
import AButton from 'src/components/medication/AButton';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';

chai.use(chaiEnzyme());

describe('AButton', () => {
  it('should print click me', () => {
    const saveButton = shallow(
            <AButton />
        );
    expect(saveButton.text()).to.eql('1');
  });
});

