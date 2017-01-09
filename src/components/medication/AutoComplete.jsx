import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import ComponentStore from 'src/helpers/componentStore';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: get(props, 'value'),
            noResultsText: '',
        };
    }
    
    handleChange(value) {
        this.setState({ value: value });
        if (this.props.onValueChange && value.length > this.props.minimumInput) {
            this.props.onValueChange(value);
        }
    }

    render() {
        const { autofocus, disabled, labelKey, valueKey,  minimumInput, loadOptions} = this.props;
        const props = {
            autofocus,
            backspaceRemoves: false,
            disabled,
            labelKey,
            minimumInput,
            options,
            loadOptions,
            value: this.state.value,
            valueKey,
        };
            return (
                <div >
                    <Select.Async
                        { ...props }
                    />
                </div>
            );
    }
}

AutoComplete.propTypes = {
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    labelKey: PropTypes.string,
    minimumInput: PropTypes.number,
    onValueChange: PropTypes.func,
    validations: PropTypes.array,
    value: PropTypes.any,
    valueKey: PropTypes.string,
};

AutoComplete.defaultProps = {
    autofocus: false,
    disabled: false,
    labelKey: 'name',
    minimumInput: 2,
    valueKey: 'uuid',
};

ComponentStore.registerComponent('autoComplete', AutoComplete);

