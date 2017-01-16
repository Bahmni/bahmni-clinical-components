import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import isEqual from 'lodash/isEqual';

export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }


    shouldComponentUpdate(nextProps, nextState) { /* check */
        if (!isEqual(this.state.value, nextState.value) ||
            this.state.noResultsText !== nextState.noResultsText) {
            return true;
        }
        return false;
    }


    handleChange(value) {
        this.setState({ value });
        this.props.onValueChange(value);
    }

    render() {

        const { autofocus, disabled, labelKey, valueKey,  minimumInput, loadOptions, placeholder, searchable} = this.props;
        const props = {
            autofocus,
            backspaceRemoves: false,
            disabled,
            labelKey,
            minimumInput,
            loadOptions,
            value: this.state.value,
            onChange: this.handleChange,
            valueKey,
            placeholder,
            searchable
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
    loadOptions: PropTypes.func,
    valueKey: PropTypes.string,
    placeholder: PropTypes.string,
    onValueChange: PropTypes.func
};

AutoComplete.defaultProps = {
    autofocus: false,
    disabled: false,
    labelKey: 'name',
    minimumInput: 0,
    valueKey: 'uuid',
    searchable: true
};

