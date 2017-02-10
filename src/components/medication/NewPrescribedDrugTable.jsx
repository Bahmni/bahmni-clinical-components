import React, { Component, PropTypes } from 'react';
import NewPrescribedDrugRow from 'src/components/medication/NewPrescribedDrugRow.jsx';

const drugTableHeader = ['Drug Information - <span className="table__cell--extraInfo">Name, Form, Route</span>',
  'Schedule - <span className="table__cell--extraInfo">Dosage, Frequency, Duration</span>',
  'Total Qty',
  'Instructions',
  'Action'];

export default class NewPrescribedDrugTable extends Component {

  _showHeaders() {
    return drugTableHeader.map((name, index) => (
      <div key={index} className={`table__cell table__cell--${index}`} dangerouslySetInnerHTML={{__html: name}} />
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
