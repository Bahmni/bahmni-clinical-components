import React, { Component, PropTypes } from 'react';
import orderBy from 'lodash/orderBy';

import DrugRow from 'src/components/medication/DrugRow.jsx';

export default class DrugSection extends Component {
  constructor(props) {
    super(props);
  }

  _displayRowData() {
    const rows = orderBy(this.props.data, 'sortWeight');  
    return rows.map((rowData, index) => {
      return (
        <DrugRow key={index} data={rowData} ></DrugRow>
      )
    })
  }

  render() {
    return (
      <div className="table-section">
        <div className="table-section-header">{this.props.header}</div>
        {this._displayRowData()}
      </div>
    );
  }
}

DrugSection.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

DrugSection.defaultValue = {
  data: [],
};
