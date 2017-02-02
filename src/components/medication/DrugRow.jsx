import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';

import { prescriptionStatus } from 'src/constants';

export default class DrugRow extends Component {
  constructor(props) {
    super(props);
  }

  _generateActions(status) {
    const { Active, Scheduled, Finished, Stopped } = prescriptionStatus;
    switch(status) {
      case Active:
        return this._activeActions();
      case Scheduled:
        return this._scheduledActions();
      case Finished:
        return this._finishedActions();
      case Stopped:
        return this._stoppedActions();
      default:
        return <div></div>;
    }
  }

  _activeActions() {
    return (
      <div className="table-actions-active">
        <a href="#">revise</a>
        <a href="#">stop</a>
        <a href="#">renew</a>
      </div>
    )
  }

  _finishedActions() {
    return (
      <div className="table-actions-finished">
        <a href="#">add</a>
      </div>
    )
  }

  _stoppedActions() {
    return this._finishedActions();
  }

  _scheduledActions() {
    return this._activeActions();
  }

  _getStatus(data) {
    const currentTime = Date.now();
    if(!isEmpty(data)) {
      if (data.dateStopped) {
        return prescriptionStatus.Stopped;
      } else if (data.effectiveStartDate >  currentTime) {
        return prescriptionStatus.Scheduled;
      } else if (data.effectiveStopDate < currentTime) {
        return prescriptionStatus.Finished;
      }
      return prescriptionStatus.Active;
    }
  }

  _displayData() {
    const data = this.props.data;
    if (!isEmpty(data)) {
      const firstColumn = `${data.drug.name} ${data.drug.form}, ${data.dosingInstructions.route}`;
      const secondColumn = `${data.dosingInstructions.dose}, ${data.dosingInstructions.frequency} for ${data.duration}
        ${data.durationUnits} started on ${new Date(data.effectiveStartDate)}`;
      const thirdColumn = data.dosingInstructions.quantity;
      const fourthColumn = data.instructions;
      const fifthColumn = this._getStatus(this.props.data);
      const sixthColumn = this._generateActions(fifthColumn);
      return (
        <div className="table-row">
          <div className="col0">{firstColumn}</div>
          <div className="col1">{secondColumn}</div>
          <div className="col2">{thirdColumn}</div>
          <div className="col3">{fourthColumn}</div>
          <div className="col4">{fifthColumn}</div>
          <div className="col5">{sixthColumn}</div>
        </div>
      )
    }
    return null;
  }


  render() {
    return this._displayData();
  }
}

DrugRow.propTypes = {
  data: PropTypes.object.isRequired,
};

DrugRow.defaultValue = {
  data: [],
};
