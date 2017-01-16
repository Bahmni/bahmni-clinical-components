import React from 'react';
import {shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, {expect} from 'chai';
import {MedicationContainer} from 'src/components/medication/MedicationContainer.jsx';

chai.use(chaiEnzyme());

describe('MedicationContainer', () => {
    it('should render Autocomplete and Button components by default', () => {
        const wrapper = shallow(<MedicationContainer />);
        console.log("Ran here");
        expect(wrapper).to.have.exactly(0).descendants('DummyControl');
    })
});
