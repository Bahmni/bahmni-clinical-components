import React, { Component, PropTypes } from 'react';
import { DateUtil } from 'src/helpers/DateUtil';

export const FilterValues = {
  Active: 'active',
  All: 'all',
};


export default class PrescriptionFilter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="drug-tab">
        <button onClick={() => this.props.onFilterChange(FilterValues.Active)} >Active</button>
        <button onClick={() => this.props.onFilterChange(FilterValues.All)} >Show All</button>
      </div>
    );
  }
}

PrescriptionFilter.propTypes = {
  data: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
