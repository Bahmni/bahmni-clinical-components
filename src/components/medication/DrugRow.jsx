import React, { Component, PropTypes } from 'react';
import { DateUtil } from 'src/helpers/DateUtil';
import StoppedReason from 'src/components/medication/StoppedReason.jsx';
import isEmpty from 'lodash/isEmpty';
// import classNames from 'classnames';

import { prescriptionStatus } from 'src/constants';

export default class DrugRow extends Component {

  _generateActions(status) {
    const { Active, Scheduled, Finished, Stopped } = prescriptionStatus;
    switch (status) {
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
    );
  }

  _finishedActions() {
    return (
      <div className="table-actions-finished">
        <a href="#">add</a>
      </div>
    );
  }

  _stoppedActions() {
    return this._finishedActions();
  }

  _scheduledActions() {
    return this._activeActions();
  }

  _displayStopped() {
    return (
      <div>
        {prescriptionStatus.Stopped}
        <StoppedReason data={this.props.data} />
      </div>
    );
  }

  _getStatus(data) {
    const currentTime = Date.now();
    if (data.dateStopped) {
      return prescriptionStatus.Stopped;
    } else if (data.effectiveStartDate > currentTime) {
      return prescriptionStatus.Scheduled;
    } else if (data.effectiveStopDate < currentTime) {
      return prescriptionStatus.Finished;
    }
    return prescriptionStatus.Active;
  }

  _getDrugInstructions(data) {
    const sosDetails = data.dosingInstructions.asNeeded ? 'SOS' : '';
    const administrationInstructions = JSON.parse(
      data.dosingInstructions.administrationInstructions
    );
    const instructions = administrationInstructions.instructions;
    const additionalInstructions = administrationInstructions.additionalInstructions || '';
    return `${sosDetails} ${instructions} ${additionalInstructions}`;
  }

  _displayData() {
    const data = this.props.data;
    if (!isEmpty(data)) {
      const drugNameAndForm = data.drug ? `${data.drug.name}, 
        ${data.drug.form}` : data.drugNonCoded;
      const firstColumn = `${drugNameAndForm}, ${data.dosingInstructions.route || ''}`;

      let dosingInstructions = '';
      if (data.dosingInstructions.dose) {
        dosingInstructions += `${data.dosingInstructions.dose} 
        ${data.dosingInstructions.doseUnits}, ${data.dosingInstructions.frequency}`;
      } else {
        const adminInstructions = JSON.parse(
          data.dosingInstructions.administrationInstructions
        );
        dosingInstructions +=
          `${adminInstructions.morningDose}` +
          `-${adminInstructions.afternoonDose}-${adminInstructions.eveningDose}`
          + `${data.dosingInstructions.doseUnits}`;
      }
      const secondColumn = `${dosingInstructions} for ` +
        `${data.duration} ${data.durationUnits} started on ` +
        `${DateUtil.dateFormat(new Date(data.effectiveStartDate))} by ${data.creatorName}`;
      const thirdColumn = `${data.dosingInstructions.quantity}` +
        ` ${data.dosingInstructions.quantityUnits}`;
      const fourthColumn = this._getDrugInstructions(data);
      const status = this._getStatus(this.props.data);
      const fifthColumn = status === prescriptionStatus.Stopped ? this._displayStopped() : status;
      const sixthColumn = this._generateActions(status);
      return (
        <div className="table__row">
          <div className="table__cell  table__cell--0">{firstColumn}</div>
          <div className="table__cell table__cell--1">{secondColumn}</div>
          <div className="table__cell table__cell--2">{thirdColumn}</div>
          <div className="table__cell table__cell--3">{fourthColumn}</div>
          <div className="table__cell table__cell--4" >
            <span className={fifthColumn}>{fifthColumn}</span>
          </div>
          <div className="table__cell table__cell--5">{sixthColumn}</div>
        </div>
      );
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
