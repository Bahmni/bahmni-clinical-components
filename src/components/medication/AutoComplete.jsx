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
        this.handleChange = this.handleChange.bind(this);
        this.getValueFromProps = this.getValueFromProps.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const value = this.getValueFromProps(nextProps);
        this.setState({ value });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!isEqual(this.props.value, nextProps.value) ||
            !isEqual(this.state.value, nextState.value) ||
            this.state.noResultsText !== nextState.noResultsText) {
            return true;
        }
        return false;
    }

    getValueFromProps(props) {
        return get(props, 'value');
    }

    handleChange(value) {
        this.setState({ value });

        if (this.props.loadOptions) {
            this.props.loadOptions(value);
        }
        this.props.onValueChange(value);
    }

    render() {

        const { autofocus, disabled, labelKey, valueKey,  minimumInput, loadOptions, placeholder} = this.props;
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
            placeholder
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
    validations: PropTypes.array,
    value: PropTypes.any,
    valueKey: PropTypes.string,
    placeholder: PropTypes.string,
    onValueChange: PropTypes.func
};

AutoComplete.defaultProps = {
    autofocus: false,
    disabled: false,
    labelKey: 'name',
    minimumInput: 2,
    valueKey: 'uuid',
};

ComponentStore.registerComponent('autoComplete', AutoComplete);

