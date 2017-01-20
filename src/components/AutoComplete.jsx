import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import isEqual from 'lodash/isEqual';

export default class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.storeChildRef = this.storeChildRef.bind(this);
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.state.value, nextState.value)) {
      return true;
    }
    return false;
  }

  storeChildRef(ref) {
    if (ref) this.childRef = ref;
  }

  handleChange(value) {
    this.setState({ value });
    this.props.onValueChange(value);
    if (this.props.searchable) {
      this.childRef.resetState();
    }
  }

  render() {
    const { autofocus,
            disabled,
            labelKey,
            valueKey,
            minimumInput,
            loadOptions,
            placeholder,
            searchable } = this.props;
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
      searchable,
      searchPromptText: null,
    };
    return (
                <div >
                    <Select.Async
                      { ...props }
                      ref={this.storeChildRef}
                    />
                </div>
    );
  }
}

AutoComplete.propTypes = {
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  labelKey: PropTypes.string,
  loadOptions: PropTypes.func,
  minimumInput: PropTypes.number,
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  valueKey: PropTypes.string,
};

AutoComplete.defaultProps = {
  autofocus: false,
  disabled: false,
  labelKey: 'name',
  minimumInput: 0,
  searchable: true,
  valueKey: 'uuid',
};

