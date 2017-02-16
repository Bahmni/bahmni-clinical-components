import React, { PropTypes } from 'react';

export const FilterValues = {
  Active: 'active',
  All: 'all',
};


const PrescriptionFilter = (props) =>
  (<div className="drug-tab">
    <button onClick={() => props.onFilterChange(FilterValues.Active)}>Active</button>
    <button onClick={() => props.onFilterChange(FilterValues.All)}>Show All</button>
  </div>);

export default PrescriptionFilter;

PrescriptionFilter.propTypes = {
  data: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
