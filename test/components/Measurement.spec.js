import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import Measurement from 'src/components/Measurement.jsx';

chai.use(chaiEnzyme());


describe('Measurement', () => {
  it('should render Measurement', () => {
    const duration = { name: 'duration' };

    const wrapper = mount(<Measurement measurement={duration} />);

    expect(wrapper.find('NumericBox').props().value).to.equal(undefined);
    expect(wrapper.find('NumericBox').props().validate).to.equal(true);
    expect(wrapper.find('NumericBox').props().validations).to.be.empty;

    expect(wrapper.find('Select').props().options).to.equal(undefined);
    expect(wrapper.find('Select').props().value).to.equal(undefined);
    expect(wrapper.find('Select').props().labelKey).to.equal('name');
    expect(wrapper.find('Select').props().valueKey).to.equal('name');
  });

  it('should change the props value of measurement when numericbox value is changed', () => {
    const duration = { name: 'duration' };
    const onChange = jest.fn(() => '');
    const wrapper = mount(<Measurement measurement={duration} onChange={onChange} />);

    expect(wrapper.find('NumericBox').props().value).to.equal(undefined);
    const numericBoxOnChange = wrapper.find('NumericBox').props().onChange;
    numericBoxOnChange('100');
    expect(onChange.mock.calls.length).to.equal(1);
    expect(onChange.mock.calls[0][0]).to.deep.equal({ name: 'duration', value: '100', unit: undefined });
  });

  it('should change the props unit of measurement when units are changed', () => {
    const duration = { name: 'duration' };
    const onChange = jest.fn(() => '');
    const wrapper = mount(<Measurement measurement={duration} onChange={onChange} />);

    const selectOnChange = wrapper.find('Select').props().onChange;
    selectOnChange({ factor: 7, name: 'Week(s)' });
    expect(onChange.mock.calls.length).to.equal(1);
    expect(onChange.mock.calls[0][0]).to.deep.equal({ name: 'duration', value: undefined, unit: { factor: 7, name: 'Week(s)' } });
  });
});
