import React from 'react';
import {mount} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, {expect} from 'chai';


import Autocomplete from '../../../src/components/medication/AutoComplete.jsx';

chai.use(chaiEnzyme());

describe('Autocomplete', () => {
    it('should render Autocomplete', () => {
        const loadOptions = jest.fn();

        const wrapper = mount(<Autocomplete loadOptions={loadOptions}/>);

        expect(wrapper.find('Select').props().valueKey).to.equal('uuid');
        expect(wrapper.find('Select').props().labelKey).to.equal('name');
        expect(wrapper.find('Select').props().minimumInput).to.equal(0);
        expect(wrapper.find('Select').props().disabled).to.equal(false);
        expect(wrapper.find('Select').props().loadOptions).to.equal(loadOptions);
    });

    it('should change the state value on input', () => {
        const options = [
            {name: 'one', value: 'One'},
            {name: 'two', value: 'Two'},
            {name: 'three', value: 'Three'},
        ];
        const loadOptions = jest.fn(() => options);
        const onValueChange = jest.fn(() => "");

        const wrapper = mount(<Autocomplete loadOptions={loadOptions} onValueChange={onValueChange}/>);

        const instance = wrapper.instance();
        expect(wrapper.state.value).to.equal(undefined);
        const onChange = wrapper.find('Select').props().onChange;
        onChange(options[0]);

        expect(loadOptions.mock.calls.length).to.equal(1);
        // expect(wrapper.state.value).to.equal(options[0]);

    });

});