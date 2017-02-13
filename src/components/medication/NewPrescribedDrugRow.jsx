import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';


export default class NewPrescribedDrugRow extends Component {

  _activeActions() {
    return (
      <div className="table-actions-active">
        <a href="#">edit</a>
        <a href="#">remove</a>
      </div>
    );
  }


  _displayData() {
    const drugOrder = this.props.drugOrder;
    if (!isEmpty(drugOrder)) {
      return (
        <div className="table__row">
          <div className="table__cell  table__cell--0">{this.props.drugOrder.getName()}</div>
          <div className="table__cell  table__cell--1">{this.props.drugOrder.getSchedule()}</div>
          <div className="table__cell  table__cell--2">
            {this.props.drugOrder.getTotalQuantity()}</div>
          <div className="table__cell  table__cell--3">
            {this.props.drugOrder.getInstructions()}</div>
          <div className="table__cell  table__cell--4">{this._activeActions()}</div>
        </div>
      );
    }
    return null;
  }


  render() {
    return this._displayData();
  }
}

NewPrescribedDrugRow.propTypes = {
  drugOrder: PropTypes.object.isRequired,
};

