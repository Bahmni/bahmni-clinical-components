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
        <div className="table-row">
          <div className="col0">{this.props.drugOrder.getName()}</div>
          <div className="col1">{this.props.drugOrder.getSchedule()}</div>
          <div className="col2">{this.props.drugOrder.getTotalQuantity()}</div>
          <div className="col3">{this.props.drugOrder.getInstructions()}</div>
          <div className="col4">{this._activeActions()}</div>
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

