import React, { Component, PropTypes } from 'react';

export const FilterValues = {
  Active: 'active',
  All: 'all',
};


export default class PrescriptionFilter extends Component {

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
