import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { NumericBox } from 'bahmni-form-controls';
import isEqual from 'lodash/isEqual';

export default class Measurement extends Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleUnitsChange = this.handleUnitsChange.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (!isEqual(this.props.measurement.value, nextProps.measurement.value)
      || !isEqual(this.props.measurement.unit, nextProps.measurement.unit)) {
      return true;
    }
    return false;
  }

  handleValueChange(value) {
    this.props.onChange({
      name: this.props.measurement.name,
      value,
      unit: this.props.measurement.unit,
    });
  }


  handleUnitsChange(unit) {
    this.props.onChange({ name: this.props.measurement.name,
      value: this.props.measurement.value,
      unit });
  }

  render() {
    return (<div className="number-units">
            <div className="number">
              <label>{this.props.label}</label>
              <NumericBox
                onChange={this.handleValueChange}
                validate validations={[]}
                value={this.props.measurement.value}
              />
            </div>
            <div className="units">
              <label>Units</label>
              <Select
                labelKey="name"
                onChange={this.handleUnitsChange}
                options={this.props.options}
                searchable={false}
                value={this.props.measurement.unit}
                valueKey="name"
              />
            </div>
           </div>
    );
  }
}

Measurement.propTypes = {
  label: PropTypes.string,
  measurement: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array,
};
