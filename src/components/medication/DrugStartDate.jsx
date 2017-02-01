import React, {Component, PropTypes} from 'react';
import {RadioButton} from 'bahmni-form-controls';

export default class DrugStartDate extends Component {
  constructor(props) {
    super(props);

    const value = props.value;
    this.options = [{name: "Today", value: "Today"}, {name: "Other Day", value: "Other Day"}];
    this.state = {value, option: this.options[0].value};
    this.handleChange = this.handleChange.bind(this);
    this.onDateSelection = this.onDateSelection.bind(this);

  }

  handleChange(value) {
    var date = "";
    this.setState({option: value} );
    if (value === this.options[0].value) {
      date = new Date().toISOString().split("T")[0];
    }
    this.props.onChange(date);
  }

  onDateSelection(e) {
    this.props.onChange(e.target.value);
  }

  render() {

    return (<div>
        <RadioButton options={this.options} value={this.state.option} onValueChange={this.handleChange} validations={[]}
                     validate={false}/>
        <input type="date" disabled={this.state.option === this.options[0].value}
               value={this.state.option === this.options[0].value? "" : this.props.value}
               onChange={this.onDateSelection}/>
      </div>
    );
  }
}

DrugStartDate.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

