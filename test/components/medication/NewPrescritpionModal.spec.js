import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
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
  dosingInstructions:[{name:"Before Meals"}]
};

describe('NewPrescriptionModal', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should render NewPrescriptionModal with the given props', () => {
    const wrapper = new ReactWrapper(mount(<NewPrescriptionModal drug={{ name: 'paracetamol' }} treatmentConfig={treatmentConfig} />).instance().modalRef, true);
    expect(wrapper.find('Measurement').length).to.equal(3);
    expect(wrapper.find('Select').length).to.equal(5);
  });
});
