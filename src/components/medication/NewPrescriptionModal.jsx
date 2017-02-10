import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import Select from 'react-select';
import Measurement from 'src/components/Measurement.jsx';
import find from 'lodash/find';
import DrugStartDate from 'src/components/medication/DrugStartDate.jsx';
import { Button as ButtonSelect } from 'bahmni-form-controls';
import { DrugOrder } from 'src/helpers/DrugOrder';

export default class NewPrescriptionModal extends Component {
  constructor(props) {
    super(props);
    const duration = { name: 'duration' };
    const dose = { name: 'dose' };
    const totalQuantity = { name: 'totalQuantity' };
    const drugStartDate = new Date().toISOString().split('T')[0];

    this.state = { duration, dose, totalQuantity, drugStartDate };
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
    this.handleTotalQuantityChange = this.handleTotalQuantityChange.bind(this);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.togglePRNStatus = this.togglePRNStatus.bind(this);
    this.handleDosingInstructionChange = this.handleDosingInstructionChange.bind(this);
    this.handleAdditionalInstructions = this.handleAdditionalInstructions.bind(this);
    this.createDrugOrder = this.createDrugOrder.bind(this);
  }


  getDecimalFromString(input) {
    if (input && typeof input === 'number') {
      return input;
    }
    if (input && typeof input === 'string') {
      const a = input.split('/');
      return (a[0] / (a[1] || 1));
    }
    return null;
  }

  getDurationUnitForFrequency(frequency) {
    const durationUnitForFrequency =
      find(
        this.props.treatmentConfig.inputOptionsConfig.frequencyDefaultDurationUnitsMap, (range) => {
          const minFrequency = this.getDecimalFromString(range.minFrequency);
          const maxFrequency = this.getDecimalFromString(range.maxFrequency);
          return ((!minFrequency || frequency.frequencyPerDay > minFrequency)
          && (!maxFrequency || frequency.frequencyPerDay <= maxFrequency));
        });

    return find(this.props.treatmentConfig.durationUnits, (durationUnit) =>
    durationUnitForFrequency && durationUnit.name === durationUnitForFrequency.defaultDurationUnit);
  }

  getPRNStatus() {
    if (this.state.PRNStatus) {
      return 'true';
    }
    return 'false';
  }

  calculateTotalQuantity(
    { dose = this.state.dose, duration = this.state.duration, frequency = this.state.frequency }) {
    const totalQty = Object.assign({}, this.state.totalQuantity);
    if (duration.value && dose.value && frequency) {
      totalQty.value = Math.ceil(
        duration.value *
        ((duration.unit && duration.unit.factor) || 1) *
        dose.value *
        frequency.frequencyPerDay
      );
    }
    totalQty.unit = dose.unit;
    return totalQty;
  }

  handleAdditionalInstructions(e) {
    this.setState({ additionalInstructions: e.target.value });
  }

  handleFrequencyChange(frequency) {
    const newState = { frequency };

    const duration = Object.assign({}, this.state.duration);
    if(frequency) {
      duration.unit = this.getDurationUnitForFrequency(frequency) || duration.unit;
      newState.duration = duration;
    }
    if (!this.state.totalQuantity.isManuallySet) {
      const totalQty = this.calculateTotalQuantity({ duration, frequency });
      newState.totalQuantity = totalQty;
    }
    this.setState(newState);
  }

  handleDosingInstructionChange(value) {
    this.setState({ instructions: value });
  }

  handleDateChange(date) {
    this.setState({ drugStartDate: date });
  }

  handleTotalQuantityChange(measurement) {
    const newMeasurement = Object.assign({}, measurement);
    newMeasurement.isManuallySet = true;
    this.setState({ [measurement.name]: newMeasurement });
  }

  handleRouteChange(route) {
    this.setState({ route });
  }

  _constructDrugOrder() {
    const dosingInstructions =
      {
        dose: this.state.dose.value,
        doseUnits: this.state.dose.unit.name,
        route: this.state.route.name,
        frequency: this.state.frequency.name,
        asNeeded: this.state.PRNStatus,
        quantity: this.state.totalQuantity.value,
        quantityUnits: this.state.totalQuantity.unit.name,
        administrationInstructions: this.state.administrationInstructions,
      };
    return new DrugOrder(
      {
        drug: this.props.drug,
        dosingInstructions,
        duration: this.state.duration.value,
        durationUnits: this.state.duration.unit.name,
        startDate: this.state.drugStartDate,
        additionalInstructions: this.state.additionalInstructions,
        instructions: this.state.instructions,
      }
    );
  }

  createDrugOrder() {
    const drugOrder = this._constructDrugOrder();
    this.props.handleDone(drugOrder);
  }


  togglePRNStatus() {
    this.setState({ PRNStatus: !this.state.PRNStatus });
  }

  handleMeasurementChange(measurement) {
    const newState = { [measurement.name]: measurement };
    if (!this.state.totalQuantity.isManuallySet) {
      const totalQty = this.calculateTotalQuantity({ [measurement.name]: measurement });
      newState.totalQuantity = totalQty;
    }
    this.setState(newState);
  }

  render() {
    const styles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
      },
      content: {
        position: 'absolute',
        top: '130px',
        left: '74px',
        right: '40px',
        bottom: 'auto',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        height: '350px',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',

      },
    };
    return (
        <ReactModal
          contentLabel="onRequestClose Example"
          isOpen
          style={styles}
        >
          <div ref={(ref) => {this.modalRef = ref;}} >
          <p>{this.props.drug.name}</p>

          <Measurement
            label="Dose"
            measurement={this.state.dose}
            onChange={this.handleMeasurementChange}
            options={this.props.treatmentConfig.doseUnits}
          /> <br />

          <p>Frequency</p>
          <Select
            labelKey="name"
            onChange={this.handleFrequencyChange}
            options={this.props.treatmentConfig.frequencies}
            searchable={true}
            value={this.state.frequency}
            valueKey="name"
          /> <br />

          <Measurement
            label="Duration"
            measurement={this.state.duration}
            onChange={this.handleMeasurementChange}
            options={this.props.treatmentConfig.durationUnits}
          />

          <Measurement
            label="Total Quantity"
            measurement={this.state.totalQuantity}
            onChange={this.handleTotalQuantityChange}
            options={this.props.treatmentConfig.doseUnits}
          />

          <DrugStartDate
            onValueChange={this.handleDateChange}
            value={this.state.drugStartDate}
          />

          <p>Routes</p>
          <Select
            labelKey="name"
            onChange={this.handleRouteChange}
            options={this.props.treatmentConfig.routes}
            searchable={false}
            value={this.state.route}
            valueKey="name"
          />

          <p>PRN {this.getPRNStatus()}</p>
          <button onClick={this.togglePRNStatus}>PRN {this.state.PRNStatus}</button>

          <p>Additional Instructions</p>
          <ButtonSelect
            multiSelect={false}
            onValueChange={this.handleDosingInstructionChange}
            options={this.props.treatmentConfig.dosingInstructions}
            validate={false}
            validations={[]}
            value={this.state.instructions}
            valueKey={'name'}
          />

          <textarea
            onChange={this.handleAdditionalInstructions}
            value={this.state.additionalInstructions}
          />

          <button onClick={this.props.handleCloseModal}>Cancel</button>
          <button onClick={this.createDrugOrder}>Done</button>
          </div>
        </ReactModal>
    );
  }
}

NewPrescriptionModal.propTypes = {
  drug: PropTypes.object,
  handleCloseModal: PropTypes.func,
  handleDone: PropTypes.func.isRequired,
  treatmentConfig: PropTypes.object,
};

