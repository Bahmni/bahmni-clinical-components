import React from 'react';
import { mount} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, {expect} from 'chai';


import MedicationContainer from '../../../src/components/medication/MedicationContainer.jsx';

chai.use(chaiEnzyme());


describe('MedicationContainer', () => {
    it('should render Autocomplete and Button components by default', () => {
        const wrapper = mount(<MedicationContainer/>);

        expect(wrapper.find('Button').length).to.equal(1);
        expect(wrapper.find('Select').length).to.equal(1);
        expect(wrapper.find('Select').props().minimumInput).to.equal(2);
        expect(wrapper.find('Select').props().searchable).to.equal(true);
    });

    it('should render Dropdown and Button components when drop down set to true', () => {
        const props = {conceptSet : "All TB Drugs", isDropDown : true};
        const wrapper = mount(<MedicationContainer {...props}/>);

        expect(wrapper.find('Button').length).to.equal(1);
        expect(wrapper.find('Select').length).to.equal(1);
        expect(wrapper.find('Select').props().minimumInput).to.equal(0);
        expect(wrapper.find('Select').props().searchable).to.equal(false);
    });
});
