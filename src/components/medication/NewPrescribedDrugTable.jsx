import React, { Component, PropTypes } from 'react';
import NewPrescribedDrugRow from 'src/components/medication/NewPrescribedDrugRow.jsx';

export default class NewPrescribedDrugTable extends Component {

  _showHeaders() {
    const headerNames = [
      'Drug Information',
      'Schedule',
      'Total Qty',
      'Price',
      'Instructions',
      'Action'];
    return headerNames.map((name, index) => (
        <div className="table-header-column" key={index}>
          {name}
        </div>
      ));
  }

  _showRow() {
    return this.props.drugOrderList.map((drugOrder, index) => (
        <NewPrescribedDrugRow drugOrder={drugOrder} key={index} />
      ));
  }

  render() {
    return (
      <div>
        <div className="table-header">
          {this._showHeaders()}
        </div>
        {this._showRow()}
      </div>
    );
  }
}

NewPrescribedDrugTable.propTypes = {
  drugOrderList: PropTypes.array,
  headers: PropTypes.array,
};

NewPrescribedDrugTable.defaultValue = {
  drugOrderList: [],
};
