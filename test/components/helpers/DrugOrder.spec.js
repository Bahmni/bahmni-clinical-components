import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { DrugOrder } from 'src/helpers/DrugOrder';

chai.use(chaiEnzyme());

const drugOrder = new DrugOrder({
  drug: {
    name: 'Ibuprofen',
    form: 'Tablet(s)',
    dosageForm: {
      display: 'Suspension',
    },
  },
  instructions: {
    name: 'Before meals',
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
  startDate: '2017-02-01',
});

const drugOrderStartingToday = new DrugOrder({
  drug: {
    name: 'Ibuprofen',
    form: 'Tablet(s)',
    dosageForm: {
      display: 'Suspension',
    },
  },
  instructions: {
    name: 'Before meals',
  },
  dosingInstructions: {
    dose: 120,
    doseUnits: 'Tablet(s)',
    route: 'Oral',
    frequency: 'Twice a day',
    asNeeded: false,
    quantity: 2880,
    quantityUnits: 'Tablet(s)',
  },

  duration: 12,
  durationUnits: 'Day(s)',
  startDate: new Date().toISOString().split('T')[0],
});


describe('DrugOrder', () => {
  it('should get name with formulation and route', () => {
    expect(drugOrder.getName()).to.equal('Ibuprofen Suspension, Oral');
  });

  it('should get schedule with dose, dose units, frequency,' +
    'duration, duration units and drug start date', () => {
    expect(drugOrder.getSchedule()).to.equal(
      '120 Tablet(s), Twice a day for 12 Day(s) starting 1 Feb 17');
  });

  it('should get schedule with dose, dose units, frequency, duration,' +
    ' duration units and drug start date as Today when startdate is today', () => {
    expect(drugOrderStartingToday.getSchedule()).to.equal(
      '120 Tablet(s), Twice a day for 12 Day(s) starting Today');
  });

  it('should get the total quantity', () => {
    expect(drugOrder.getTotalQuantity()).to.equal('2880  Tablet(s)');
  });

  it('should get PRN status', () => {
    expect(drugOrder.getPRNStatus()).to.equal('PRN ');
  });

  it('should return empty string when PRN status is false', () => {
    expect(drugOrderStartingToday.getPRNStatus()).to.equal('');
  });

  it('should get instructions', () => {
    expect(drugOrder.getInstructions()).to.deep.equal('PRN Before meals  ');
  });
});
