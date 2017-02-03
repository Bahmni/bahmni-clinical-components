import React, { Component, PropTypes } from 'react';
import { RadioButton } from 'bahmni-form-controls';
import isEqual from 'lodash/isEqual';

export default class DrugStartDate extends Component {
  constructor(props) {
    super(props);
    const value = props.value;
    this.options = [{ name: 'Today', value: 'Today' }, { name: 'Other Day', value: 'Other Day' }];
    this.state = { value, option: this.options[0].value };
    this.handleChange = this.handleChange.bind(this);
    this.onDateSelection = this.onDateSelection.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.props.value, nextProps.value)
      || !isEqual(this.state.option, nextState.option)) {
      return true;
    }
    return false;
  }

  onDateSelection(e) {
    this.props.onValueChange(e.target.value);
  }


  handleChange(value) {
    let date = '';
    this.setState({ option: value });
    if (value === this.options[0].value) {
      date = new Date().toISOString().split('T')[0];
    }
    this.props.onValueChange(date);
  }

  render() {
    return (<div>
        <RadioButton onValueChange={this.handleChange}
          options={this.options}
          validate={false}
          validations={[]}
          value={this.state.option}
        />
        <input disabled={this.state.option === this.options[0].value}
          onChange={this.onDateSelection}
          type="date"
          value={this.state.option === this.options[0].value ? '' : this.props.value}
        />
      </div>
    );
  }
}

DrugStartDate.propTypes = {
  onValueChange: PropTypes.func,
  value: PropTypes.string,
};
