import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import NewPrescriptionModal from 'src/components/medication/NewPrescriptionModal.jsx';
import fetchMock from 'fetch-mock';

chai.use(chaiEnzyme());
var treatmentConfig = {
  getDrugConceptSet: function () {
    return "All TB Drugs";
  },
  isDropDownForGivenConceptSet: function () {
    return false;
  },
  isAutoCompleteForGivenConceptSet: function () {
    return false;
  },
  isAutoCompleteForAllConcepts: function () {
    return true;
  },
  getDoseFractions: function () {
    return [{"value": 0.50, "label": "½"}];
  },
  frequencies: [{name: 'Twice a day', frequencyPerDay: 2}],
  durationUnits: [
    {name: "Day(s)", factor: 1},
    {name: "Week(s)", factor: 7},
    {name: "Month(s)", factor: 30}
  ],
  inputOptionsConfig: {"frequencyDefaultDurationUnitsMap": [
    {
      "minFrequency": 5,
      "maxFrequency": null,
      "defaultDurationUnit": "Hour(s)"
    }
  ]},
  dosingInstructions:[{name:"Before Meals"}],
  doseUnits:["Tablet","ml","IU"]
};

describe('NewPrescriptionModal', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should render NewPrescriptionModal with the given props', () => {
    const wrapper = new ReactWrapper(mount(<NewPrescriptionModal drug={{ name: 'paracetamol' }} treatmentConfig={treatmentConfig} />).instance().modalRef, true);
    expect(wrapper.find('Measurement').length).to.equal(3);
    expect(wrapper.find('Select').length).to.equal(5);
    expect(wrapper.find('DrugStartDate').length).to.equal(1);
    expect(wrapper.find('Button').length).to.equal(1);
  });


  it('should render all dropdowns with options from config', () => {
    const wrapper = new ReactWrapper(mount(<NewPrescriptionModal drug={{ name: 'paracetamol' }} treatmentConfig={treatmentConfig} />).instance().modalRef, true);
      var nodes = wrapper.find('Select');
    expect(nodes.at(0).props().options).to.equal(treatmentConfig.doseUnits);
    expect(nodes.at(1).props().options).to.equal(treatmentConfig.frequencies);
    expect(nodes.at(2).props().options).to.equal(treatmentConfig.durationUnits);
    expect(nodes.at(3).props().options).to.equal(treatmentConfig.doseUnits);
  });
});
