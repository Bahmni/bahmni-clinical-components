import React, { Component, PropTypes } from 'react';
import { ComponentStore } from 'bahmni-form-controls';
import AutoComplete from 'src/components/AutoComplete.jsx';
import { httpInterceptor } from 'src/helpers/httpInterceptor';
import Button from 'src/components/Button.jsx';
import NewPrescriptionModal from 'src/components/medication/NewPrescriptionModal.jsx';

export default class MedicationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { color: 'red', showModal: false };
    this.getDrugs = this.getDrugs.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onDrugSelect = this.onDrugSelect.bind(this);
  }

  onDrugSelect(value) {
    if (value && value.uuid) {
      this.setState({ color: 'blue', value, showModal: true });
    } else {
      this.setState({ color: 'red', value });
    }
  }

  getDrugs(input) {
    const optionsUrl = '/openmrs/ws/rest/v1/drug';
    const params = {
      v: 'custom:(uuid,strength,name,dosageForm,concept:(uuid,name,names:(name)))',
      s: 'ordered',
      q: input,
    };
    if (this.props.drugConceptSet) {
      params.q = this.props.drugConceptSet;
      params.s = 'byConceptSet';
    }
    return httpInterceptor.get(optionsUrl, params)
            .then((data) => {
              const options = data.results;
              return { options };
            }).catch(() => {
              const options = [];
              return { options };
            });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    let minimumInput = 0;
    if (!this.props.isDropDown) {
      minimumInput = 2;
    }


    return (
        <div>
          <AutoComplete
            loadOptions={this.getDrugs}
            minimumInput={minimumInput}
            onValueChange={this.onDrugSelect}
            placeholder="Search for drug to add to prescription"
            searchable={!(this.props.isDropDown && this.props.drugConceptSet)}
          />
          <Button color={this.state.color} label="Add to prescription" />
          { this.state.showModal && <NewPrescriptionModal drug={this.state.value}
            handleCloseModal={this.handleCloseModal}
            treatmentConfig={this.props.treatmentConfig}
          /> }
          </div>);
  }
}

MedicationContainer.propTypes = {
  drugConceptSet: PropTypes.string,
  isDropDown: PropTypes.bool,
  treatmentConfig: PropTypes.object,
};

MedicationContainer.defaultProps = {
  drugConceptSet: null,
  isDropDown: false,
};

ComponentStore.registerComponent('MedicationContainer', MedicationContainer);
