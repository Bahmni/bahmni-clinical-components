import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';


export default class NewPrescribedDrugRow extends Component {
  constructor(props) {
    super(props);
  }


  _activeActions() {
    return (
      <div className="table-actions-active">
        <a href="#">edit</a>
        <a href="#">favorites</a>
        <a href="#">remove</a>
      </div>
    )
  }


  _displayData() {
    const drugOrder = this.props.drugOrder;
    if (!isEmpty(drugOrder)) {
      return (
        <div className="table-row">
          <div className="col0">{this.props.drugOrder.getName()}</div>
          <div className="col0">{this.props.drugOrder.getSchedule()}</div>
          <div className="col0">{this.props.drugOrder.getTotalQuantity()}</div>
          <div className="col0">{this.props.drugOrder.getInstructions()}</div>
          <div className="col0">{this._activeActions()}</div>
        </div>
      )
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

