import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import NewPrescriptionModal from 'src/components/medication/NewPrescriptionModal.jsx';
import fetchMock from 'fetch-mock';

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
    {
      minFrequency: '1/7',
      maxFrequency: 5,
      defaultDurationUnit: 'Day(s)',
    },
  ] },
  dosingInstructions: [{ name: 'Before Meals' }],
  doseUnits: ['Tablet', 'ml', 'IU'],
  routes: [{ name: 'Nasal', rootConcept: null }, { name: 'Topical', rootConcept: null }],
};

describe('NewPrescriptionModal', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should render NewPrescriptionModal with the given props', () => {
    const wrapper = new ReactWrapper(
      mount(
        <NewPrescriptionModal
          drug={{ name: 'paracetamol' }}
          handleDone={ () => {} }
          treatmentConfig={treatmentConfig}
        />
      ).instance().modalRef, true
    );
    expect(wrapper.find('Measurement').length).to.equal(3);
    expect(wrapper.find('Select').length).to.equal(5);
    expect(wrapper.find('DrugStartDate').length).to.equal(1);
    expect(wrapper.find('Button').length).to.equal(1);
  });


  it('should render all dropdowns with options from config', () => {
    const wrapper = new ReactWrapper(
      mount(
        <NewPrescriptionModal
          drug={{ name: 'paracetamol' }}
          handleDone={ () => {} }
          treatmentConfig={treatmentConfig}
        />
      ).instance().modalRef, true
    );
    const nodes = wrapper.find('Select');
    expect(nodes.at(0).props().options).to.equal(treatmentConfig.doseUnits);
    expect(nodes.at(1).props().options).to.equal(treatmentConfig.routes);
    expect(nodes.at(2).props().options).to.equal(treatmentConfig.frequencies);
    expect(nodes.at(3).props().options).to.equal(treatmentConfig.durationUnits);
    expect(nodes.at(4).props().options).to.equal(treatmentConfig.doseUnits);
  });


  describe('get decimal from string', () => {
    it('should parse decimal from string where string is a fraction', () => {
      const wrapper = mount(
        <NewPrescriptionModal
          drug={{ name: 'paracetamol' }}
          handleDone={ () => {} }
          treatmentConfig={treatmentConfig}
        />
      );
      const getValueFromString = wrapper.instance().getDecimalFromString('1/2');

      expect(getValueFromString).to.equal(0.5);
    });

    it('should parse decimal from input when it is a number', () => {
      const wrapper = mount(
        <NewPrescriptionModal
          drug={{ name: 'paracetamol' }}
          handleDone={ () => {} }
          treatmentConfig={treatmentConfig}
        />
      );
      const getValueFromString = wrapper.instance().getDecimalFromString(10);

      expect(getValueFromString).to.equal(10);
    });

    it('should return null when input is null', () => {
      const wrapper = mount(
        <NewPrescriptionModal
          drug={{ name: 'paracetamol' }}
          handleDone={ () => {} }
          treatmentConfig={treatmentConfig}
        />
      );
      const getValueFromString = wrapper.instance().getDecimalFromString();

      expect(getValueFromString).to.equal(null);
    });
  });


  it('should set duration unit to null if factor is not defined for the frequency', () => {
    const wrapper = mount(
      <NewPrescriptionModal
        drug={{ name: 'paracetamol' }}
        handleDone={ () => {} }
        treatmentConfig={treatmentConfig}
      />
    );
    const frequency = { uuid: '0', frequencyPerDay: 1, name: 'Once a day' };
    const durationUnit = wrapper.instance().getDurationUnitForFrequency(frequency);

    expect(durationUnit).to.deep.equal({ name: 'Day(s)', factor: 1 });
  });

  it('should set the total quantity unit when dose units is set', () => {
    const wrapper = new ReactWrapper(
      mount(
        <NewPrescriptionModal
          drug={{ name: 'paracetamol' }}
          handleDone={ () => {} }
          treatmentConfig={treatmentConfig}
        />
      ).instance().modalRef, true
    );
    const dose = { name: 'dose', unit: { name: 'ml', rootConcept: undefined } };
    const onChange = wrapper.find('Measurement').at(0).props().onChange;

    expect(wrapper.find('Measurement').at(2).props().measurement).to.deep.equal(
      { name: 'totalQuantity' });
    onChange(dose);
    expect(wrapper.find('Measurement').at(2).props().measurement).to.deep.equal(
      { name: 'totalQuantity', unit: { name: 'ml', rootConcept: undefined } });
  });

  it('should calculate the total quantity with dose, duration and frequency', () => {
    const wrapper = mount(
      <NewPrescriptionModal
        drug={{ name: 'paracetamol' }}
        handleDone={ () => {} }
        treatmentConfig={treatmentConfig}
      />
    );
    const dose = { name: 'dose', value: '1', unit: 'Tablet(s)' };
    const duration = { name: 'duration', value: '2', unit: { name: 'Day(s)', factor: 1 } };
    const frequency = { uuid: '0', frequencyPerDay: 2, name: 'Immediately' };

    const totalQuantity = wrapper.instance().calculateTotalQuantity({ dose, duration, frequency });

    expect(totalQuantity.value).to.equal(4);
    expect(totalQuantity.unit).to.equal(dose.unit);
  });

  it('should set the default duration units with factor 1 ' +
    'when duration units is not defined', () => {
    const wrapper = mount(
      <NewPrescriptionModal
        drug={{ name: 'paracetamol' }}
        handleDone={ () => {} }
        treatmentConfig={treatmentConfig}
      />
    );
    const dose = { name: 'dose', value: '10', unit: 'Tablet(s)' };
    const duration = { name: 'duration', value: '2' };
    const frequency = { uuid: '0', frequencyPerDay: 24, name: 'Every Hour' };

    const totalQuantity = wrapper.instance().calculateTotalQuantity({ dose, duration, frequency });

    expect(totalQuantity.value).to.equal(480);
    expect(totalQuantity.unit).to.equal(dose.unit);
  });


  it('should set the drug start date when date is changed', () => {
    const wrapper = new ReactWrapper(
      mount(
        <NewPrescriptionModal
          drug={{ name: 'paracetamol' }}
          handleDone={ () => {} }
          treatmentConfig={treatmentConfig}
        />
      ).instance().modalRef, true
    );
    const onChange = wrapper.find('DrugStartDate').props().onValueChange;

    onChange('2017-02-01');
    expect(wrapper.find('DrugStartDate').props().value).to.equal('2017-02-01');
  });


  it('should toggle the PRN when PRN button is clicked', () => {
    const wrapper = mount(
      <NewPrescriptionModal
        drug={{ name: 'paracetamol' }}
        handleDone={ () => {} }
        treatmentConfig={treatmentConfig}
      />
    );

    wrapper.instance().togglePRNStatus();
    expect(wrapper.state().PRNStatus).to.equal(true);
    wrapper.instance().togglePRNStatus();
    expect(wrapper.state().PRNStatus).to.equal(false);
  });

  it('should handle frequency change and calculate the total quantity units ', () => {
    const wrapper = mount(
      <NewPrescriptionModal
        drug={{ name: 'paracetamol' }}
        handleDone={ () => {} }
        treatmentConfig={treatmentConfig}
      />
    );
    const frequency = { uuid: '0', frequencyPerDay: 24, name: 'Every Hour' };

    wrapper.instance().handleFrequencyChange(frequency);
    expect(wrapper.state().frequency).to.deep.equal(frequency);
  });

  it('should set the total quantity when it is manually changed', () => {
    const wrapper = mount(
      <NewPrescriptionModal
        drug={{ name: 'paracetamol' }}
        handleDone={ () => {} }
        treatmentConfig={treatmentConfig}
      />
    );
    const totalQuantity = { name: 'totalQuantity', unit: { name: 'ml' }, value: '120' };

    wrapper.instance().handleTotalQuantityChange(totalQuantity);

    expect(wrapper.state().totalQuantity).to.deep.equal(
      Object.assign({}, totalQuantity, { isManuallySet: true }));
  });

  it('should set the dosing instructions on change', () => {
    const wrapper = mount(
      <NewPrescriptionModal
        drug={{ name: 'paracetamol' }}
        handleDone={ () => {} }
        treatmentConfig={treatmentConfig}
      />
    );
    const dosingInstructions = { name: 'Before meals', rootConcept: null };

    expect(wrapper.state().instructions).to.equal(undefined);
    wrapper.instance().handleDosingInstructionChange(dosingInstructions);
    expect(wrapper.state().instructions).to.deep.equal(dosingInstructions);
  });

  it('should set the route on change', () => {
    const wrapper = mount(
      <NewPrescriptionModal
        drug={{ name: 'paracetamol' }}
        handleDone={ () => {} }
        treatmentConfig={treatmentConfig}
      />
    );
    const route = { name: 'Topical' };

    wrapper.instance().handleRouteChange(route);
    expect(wrapper.state().route).to.deep.equal(route);
  });

  it('should set the additional instructions', () => {
    const wrapper = mount(
      <NewPrescriptionModal
        drug={{ name: 'paracetamol' }}
        handleDone={ () => {} }
        treatmentConfig={treatmentConfig}
      />
    );
    const additionalInstructions = { target: { value: 'Once a day' } };

    wrapper.instance().handleAdditionalInstructions(additionalInstructions);
    expect(wrapper.state().additionalInstructions).to.equal('Once a day');
  });

  it('should create a drug order from state', () => {
    const addNewDrug = jest.fn((drugOrder) => drugOrder);
    const wrapper = mount(
      <NewPrescriptionModal
        drug={{ name: 'paracetamol' }}
        handleDone={addNewDrug}
        treatmentConfig={treatmentConfig}
      />
    );
    const drugInformation = {
      dose: { value: '12', unit: { name: 'ml' } },
      duration: { value: '12', unit: { factor: 1, name: 'Day(s)' } },
      route: { name: 'Oral' },
      frequency: { frequencyPerDay: 1, name: 'Once a day' },
      PRNStatus: true,
      drug: { concept: { name: 'Paracetamol' } },
      additionalInstructions: 'With water',
      instructions: { name: 'Empty Stomach' },
      totalQuantity: { value: '144', unit: { name: 'ml' } },
      startDate: '2017-02-13',
    };

    const drugOrder = {
      dosingInstructions: {
        dose: '12',
        doseUnits: 'ml',
        frequency: 'Once a day',
        asNeeded: true,
        quantity: '144',
        quantityUnits: 'ml',
        route: 'Oral',
      },
      drug: { concept: { name: 'Paracetamol' } },
      duration: '12',
      durationUnits: 'Day(s)',
      instructions: { name: 'Empty Stomach' },
      startDate: '2017-02-13',
    };
    wrapper.setState(drugInformation);
    wrapper.instance().createDrugOrder();

    expect(addNewDrug.mock.calls.length).to.equal(1);
    expect(addNewDrug.mock.calls[0][0].dosingInstructions)
      .to.deep.equal(drugOrder.dosingInstructions);
  });
});
