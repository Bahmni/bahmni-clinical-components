import React, { Component, PropTypes } from 'react';
import orderBy from 'lodash/orderBy';
import { dateFormat } from 'src/helpers/dateFormat';

import DrugRow from 'src/components/medication/DrugRow.jsx';

export default class DrugSection extends Component {
  constructor(props) {
    super(props);
    const date = new Date(Number.parseInt(props.header));
    this.header = dateFormat(date);
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
        <div className="table-section-header">{this.header}</div>
        {this._displayRowData()}
      </div>
    );
  }
}

DrugSection.propTypes = {
  header: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

DrugSection.defaultValue = {
  data: [],
};
