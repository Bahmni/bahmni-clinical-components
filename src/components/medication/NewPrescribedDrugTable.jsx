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
        <div className="table__cell" key={index}>
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
    if(this._showRow() != ''){
      return (
        <div className="table">
          <div className="table__header table__header--filled">
            <div className="table__row">
              {this._showHeaders()}
            </div>
          </div>
          <div className="table__body">
            <div className="table__body__row">
              {this._showRow()}
            </div>
          </div>
        </div>
      );
    }
    return false;

  }
}

NewPrescribedDrugTable.propTypes = {
  drugOrderList: PropTypes.array,
  headers: PropTypes.array,
};

NewPrescribedDrugTable.defaultValue = {
  drugOrderList: [],
};
