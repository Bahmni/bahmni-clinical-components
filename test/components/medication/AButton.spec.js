import {shallow} from 'enzyme';
import React from 'react';
import AButton from '../../../src/components/medication/AButton';

describe('AButton', () => {
    it('should print click me', () => {
        const checkbox = shallow(
            <AButton title="Save"/>
        );
        expect(checkbox.text()).toEqual('Save');
    });
});

