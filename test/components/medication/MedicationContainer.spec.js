import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import MedicationContainer from '../../../src/components/medication/MedicationContainer.jsx';

chai.use(chaiEnzyme());


describe('MedicationContainer', () => {
  it('should render Autocomplete and Button components by default', () => {
    const wrapper = mount(<MedicationContainer />);

    expect(wrapper.find('Button').length).to.equal(1);
    expect(wrapper.find('Select').length).to.equal(1);
    expect(wrapper.find('Select').props().minimumInput).to.equal(2);
    expect(wrapper.find('Select').props().searchable).to.equal(true);
  });

  it('should change button props to red on drug select when drug is non coded  ', () => {
    const props = { conceptSet: 'All TB Drugs', isDropDown: true };
    const wrapper = mount(<MedicationContainer {...props} />);
    const onChange = wrapper.find('Select').props().onChange;
    onChange('paracetmol');
    expect(wrapper.find('Button').length).to.equal(1);
    expect(wrapper.find('Select').length).to.equal(1);
    expect(wrapper.find('Select').props().minimumInput).to.equal(0);
    expect(wrapper.find('Select').props().searchable).to.equal(false);
    expect(wrapper.find('Button').props().color).to.equal('red');
  });

  it('should change button props to blue on drug select when drug is  coded  ', () => {
    const props = { conceptSet: 'All TB Drugs', isDropDown: true };
    const wrapper = mount(<MedicationContainer {...props} />);
    const onChange = wrapper.find('Select').props().onChange;
    onChange({ uuid: 'some uuid' });
    expect(wrapper.find('Button').length).to.equal(1);
    expect(wrapper.find('Select').length).to.equal(1);
    expect(wrapper.find('Select').props().minimumInput).to.equal(0);
    expect(wrapper.find('Select').props().searchable).to.equal(false);
    expect(wrapper.find('Button').props().color).to.equal('blue');
  });
});
