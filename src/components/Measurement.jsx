import React, {Component, PropTypes} from 'react';
import {httpInterceptor} from 'src/helpers/httpInterceptor';
import Select from 'react-select';
import {NumericBox} from 'bahmni-form-controls';

export default class Measurement extends Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleUnitsChange = this.handleUnitsChange.bind(this);
  }

  handleValueChange(value){
    this.props.onChange({name:this.props.measurement.name, value :value, unit : this.props.measurement.unit});
  }

  handleUnitsChange(unit){
    this.props.onChange({ name:this.props.measurement.name, value : this.props.measurement.value, unit : unit});
  }


  render() {
    return (<div>
            <p>{this.props.label}</p>
            <NumericBox value={this.props.measurement.value} onChange={this.handleValueChange} validate={true}  validations={[]}/>
            <p>Units</p>
            <Select options={this.props.options} value={this.props.measurement.unit} labelKey="name" valueKey="name" onChange={this.handleUnitsChange}  searchable={false}/>
           </div>
    );
  }


}

Measurement.propTypes = {
  measurement:PropTypes.object.isRequired,
  options: PropTypes.array,
  onChange:PropTypes.func,
  label: PropTypes.string
};


