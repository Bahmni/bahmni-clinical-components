import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import DrugStartDate from 'src/components/medication/DrugStartDate.jsx';

chai.use(chaiEnzyme());


describe('DrugStartDate', () => {
  it('should render drug start date with options today and other day', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DrugStartDate
        onValueChange={onChange}
        value={new Date().toISOString().split('T')[0]}
      />
    );
    const options = [{ name: 'Today', value: 'Today' }, { name: 'Other Day', value: 'Other Day' }];

    expect(wrapper.find('RadioButton').props().options).to.deep.equal(options);
    expect(wrapper.find('RadioButton').props().validate).to.equal(false);
    expect(wrapper.find('RadioButton').props().value).to.equal(options[0].value);
    expect(wrapper.find('input').at(0).props().type).to.equal('radio');
    expect(wrapper.find('input').at(1).props().type).to.equal('radio');
    expect(wrapper.find('input').at(2).props().type).to.equal('date');
    expect(wrapper.find('input').at(2).props().value).to.equal('');
  });

  it('should set the date to today when option is changed from Other day to Today', () => {
    const onChange = jest.fn(() => {});
    const wrapper = mount(
      <DrugStartDate
        onValueChange={onChange}
        value={new Date().toISOString().split('T')[0]}
      />
    );

    const onValueChange = wrapper.find('RadioButton').props().onValueChange;
    onValueChange('Today');

    expect(onChange.mock.calls.length).to.equal(1);
    expect(onChange.mock.calls[0][0]).to.equal(new Date().toISOString().split('T')[0]);
  });


  it('should set the date from the date field', () => {
    const onChange = jest.fn(() => {});
    const wrapper = mount(
      <DrugStartDate
        onValueChange={onChange}
        value={new Date().toISOString().split('T')[0]}
      />
    );

    wrapper.find('input').at(2).simulate('change', { target: { value: '2017-02-01' } });

    expect(onChange.mock.calls.length).to.equal(1);
    expect(onChange.mock.calls[0][0]).to.equal('2017-02-01');
  });
});
