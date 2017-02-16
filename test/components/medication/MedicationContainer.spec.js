import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import MedicationContainer from 'src/components/medication/MedicationContainer.jsx';
import fetchMock from 'fetch-mock';
import { DrugOrder } from 'src/helpers/DrugOrder';

chai.use(chaiEnzyme());


const treatmentConfig = {
  getDrugConceptSet() {
    return 'All TB Drugs';
  },
  isDropDownForGivenConceptSet() {
    return false;
  },
  isAutoCompleteForGivenConceptSet() {
    return false;
  },
  isAutoCompleteForAllConcepts() {
    return true;
  },
  getDoseFractions() {
    return [{ value: 0.50, label: '½' }];
  },
  frequencies: [{ name: 'Twice a day', frequencyPerDay: 2 }],
  durationUnits: [
    { name: 'Day(s)', factor: 1 },
    { name: 'Week(s)', factor: 7 },
    { name: 'Month(s)', factor: 30 },
  ],
  inputOptionsConfig: { frequencyDefaultDurationUnitsMap: [
    {
      minFrequency: 5,
      maxFrequency: null,
      defaultDurationUnit: 'Hour(s)',
    },
  ] },
  dosingInstructions: [{ name: 'Before Meals' }],
};

const drugOrder = new DrugOrder({
  drug: {
    name: 'Ibuprofen',
    form: 'Tablet(s)',
    dosageForm: { display: 'Once a day' },
  },
  dosingInstructions: {
    dose: 120,
    doseUnits: 'Tablet(s)',
    route: 'Oral',
    frequency: 'Twice a day',
    asNeeded: true,
    quantity: 2880,
    quantityUnits: 'Tablet(s)',
  },
  duration: 12,
  durationUnits: 'Day(s)',
});

const mockStore = {
  getState: () => ({}),
  dispatch: () => {},
};


describe('MedicationContainer', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should render Autocomplete and Button components by default', () => {
    const wrapper = mount(<MedicationContainer
      patientUuid="some uuid"
      store={mockStore}
      treatmentConfig={treatmentConfig}
    />);

    expect(wrapper.find('Button').length).to.equal(1);
    expect(wrapper.find('Select').length).to.equal(1);
    expect(wrapper.find('Select').props().minimumInput).to.equal(2);
    expect(wrapper.find('Select').props().searchable).to.equal(true);
  });

  it('should change button props to red on drug select when drug is non coded  ', () => {
    const props = {
      drugConceptSet: 'All TB Drugs',
      isDropDown: true, treatmentConfig,
      patientUuid: 'some uuid',
    };
    const wrapper = mount(<MedicationContainer {...props} store={ mockStore } />);
    const onChange = wrapper.find('Select').props().onChange;
    onChange('paracetmol');
    expect(wrapper.find('Button').length).to.equal(1);
    expect(wrapper.find('Select').length).to.equal(1);
    expect(wrapper.find('Select').props().minimumInput).to.equal(0);
    expect(wrapper.find('Select').props().searchable).to.equal(false);
    expect(wrapper.find('Button').props().color).to.equal('red');
  });

  it('should change button props to blue on drug select when drug is  coded  ', () => {
    const props = { drugConceptSet: 'All TB Drugs',
      isDropDown: true,
      treatmentConfig,
      patientUuid: 'some uuid' };
    const wrapper = mount(<MedicationContainer {...props} store={ mockStore } />);
    const onChange = wrapper.find('Select').props().onChange;
    onChange({ uuid: 'some uuid' });
    expect(wrapper.find('Button').length).to.equal(1);
    expect(wrapper.find('Select').length).to.equal(1);
    expect(wrapper.find('Select').props().minimumInput).to.equal(0);
    expect(wrapper.find('Select').props().searchable).to.equal(false);
    expect(wrapper.find('Button').props().color).to.equal('blue');
  });

  it('should render Autocomplete with load options by default', () => {
    const options = { name: 'paracetamol', value: '100' };
    fetchMock.mock(
      '/openmrs/ws/rest/v1/drug?v=custom%3A(uuid%2Cstrength%2Cname%2CdosageForm' +
      '%2Cconcept%3A(uuid%2Cname%2Cnames%3A(name)))&s=ordered&q=pa',
      options);

    fetchMock.mock(
      '/openmrs/ws/rest/v1/bahmnicore/drugOrders?includeActiveVisit=true&numberOfVisits=30' +
      '&patientUuid=some uuid', []);

    const wrapper = mount(<MedicationContainer
      patientUuid="some uuid"
      store={mockStore}
      treatmentConfig={treatmentConfig}
    />);
    const onChange = wrapper.find('ClinicalAutoComplete').props().loadOptions;
    onChange('pa');
    expect(fetchMock.calls().matched.length).to.eql(2);
  });

  it('should close modal when Close button is clicked', () => {
    const wrapper = mount(<MedicationContainer
      patientUuid="some uuid"
      store={mockStore}
      treatmentConfig={treatmentConfig}
    />);

    wrapper.instance().handleCloseModal();
    expect(wrapper.state().showModal).to.equal(false);
  });

  it('should clear the autocomplete field when drug details are added and clicked done', () => {
    const wrapper = mount(<MedicationContainer
      patientUuid={'patientUuid'}
      store={mockStore}
      treatmentConfig={treatmentConfig}
    />);

    const drug = { name: 'Ibuprofen' };
    wrapper.instance().onDrugSelect(drug);
    expect(wrapper.state().value).to.deep.equal(drug);

    wrapper.instance().addNewDrug();
    expect(wrapper.state().value).to.equal(null);
    expect(wrapper.state().color).to.equal('red');
  });

  it('should clear the autocomplete field when drug details are added and clicked cancel', () => {
    const wrapper = mount(<MedicationContainer
      patientUuid={'patientUuid'}
      store={mockStore}
      treatmentConfig={treatmentConfig}
    />);

    const drug = { name: 'Ibuprofen' };
    wrapper.instance().onDrugSelect(drug);
    expect(wrapper.state().value).to.deep.equal(drug);

    wrapper.instance().handleCloseModal();
    expect(wrapper.state().value).to.equal(null);
    expect(wrapper.state().color).to.equal('red');
  });

  it('should not show prescription table when there are no prescribed drugs', () => {
    const wrapper = mount(<MedicationContainer
      patientUuid={'patientUuid'}
      store={mockStore}
      treatmentConfig={treatmentConfig}
    />);

    expect(wrapper.find('NewPrescribedDrugTable').length).to.equal(0);
  });

  it('should show prescription table when there are prescribed drugs', () => {
    const wrapper = mount(<MedicationContainer
      patientUuid={'patientUuid'}
      store={mockStore}
      treatmentConfig={treatmentConfig}
    />);

    wrapper.instance().addNewDrug(drugOrder);
    expect(wrapper.find('NewPrescribedDrugTable').length).to.equal(1);
  });
});
