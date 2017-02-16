import React, { Component, PropTypes } from 'react';

export const FilterValues = {
  Active: 'active',
  All: 'all',
};


export default class PrescriptionFilter extends Component {

  render() {
    return (
      <div className="drug-tab">
        <ul>
          <li><a onClick={() => this.props.onFilterChange(FilterValues.Active)}>Active Prescriptions</a></li>
          <li><a onClick={() => this.props.onFilterChange(FilterValues.All)} >Show All</a></li>
        </ul>
      </div>
    );
  }
}

PrescriptionFilter.propTypes = {
  data: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
