import React, { Component, PropTypes } from 'react';
import { ComponentStore } from 'bahmni-form-controls';
import AutoComplete from 'src/components/AutoComplete.jsx';
import { httpInterceptor } from 'src/helpers/httpInterceptor';
import { urlConstants } from 'src/constants';
import Button from 'src/components/Button.jsx';
import DrugTable from 'src/components/medication/DrugTable.jsx'
import PrescriptionFilter, { FilterValues } from 'src/components/medication/PrescriptionFilter.jsx'
import { DateUtil } from 'src/helpers/DateUtil';
import NewPrescriptionModal from 'src/components/medication/NewPrescriptionModal.jsx';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';

export default class MedicationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { drugHistoryData: [], color: 'red', showModal: false, filter: FilterValues.Active };
    this.getDrugs = this.getDrugs.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onDrugSelect = this.onDrugSelect.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  componentDidMount() {
    const allDrugHistory = `${urlConstants.allDrugHistory}${this.props.patientUuid}`;
    return httpInterceptor.get(allDrugHistory)
      .then((data) => this.setState({ drugHistoryData: data }))
      .catch(() => {
        const options = [];
        return { options };
      });
  }

  onDrugSelect(value) {
    if (value && value.uuid) {
      this.setState({ color: 'blue', value, showModal: true });
    } else {
      this.setState({ color: 'red', value });
    }
  }

  getDrugs(input) {
    const optionsUrl = urlConstants.drugOptionUrl;
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

  _filterFunction() {
    if(this.state.filter === FilterValues.Active) {
      return filter(this.state.drugHistoryData, (data) => {
        return !data.dateStopped && data.effectiveStopDate > DateUtil.dateWithoutTime().getTime();
      })
    }
    return this.state.drugHistoryData;
  }

  _onFilterChange(filter) {
    this.setState({ filter });
  }

  _showDrugHistoryTabs() {
    if(!isEmpty(this.state.drugHistoryData)) {
      return (
        <div>
          <PrescriptionFilter data={this.state.drugHistoryData} onFilterChange={this._onFilterChange}/>
          <DrugTable data={this._filterFunction()} activePrescription={false}/>
        </div>
      );
    }
    return null;
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
          {this._showDrugHistoryTabs()}
        </div>);
  }
}

MedicationContainer.propTypes = {
  patientUuid: PropTypes.string.isRequired,
  drugConceptSet: PropTypes.string,
  isDropDown: PropTypes.bool,
  treatmentConfig:PropTypes.object.isRequired
};

MedicationContainer.defaultProps = {
  drugConceptSet: null,
  isDropDown: false,
};

ComponentStore.registerComponent('MedicationContainer', MedicationContainer);
