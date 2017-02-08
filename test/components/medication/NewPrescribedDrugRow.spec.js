import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import NewPrescribedDrugRow from 'src/components/medication/NewPrescribedDrugRow.jsx';
import { DrugOrder } from 'src/helpers/DrugOrder';

chai.use(chaiEnzyme());

describe('NewPrescribedDrugRow', () => {
  const rowData = new DrugOrder({
    drug: {
      name: 'Paracetemol',
      dosageForm: { display: 'Tablet(s)' },
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

  it('should render row with the appropriate data', () => {
    const wrapper = shallow(<NewPrescribedDrugRow drugOrder={{}} />);
    const tableRow = wrapper.find('.table-row');

    expect(tableRow.children()).to.have.length(0);
  });

  it('should render row with the appropriate data', () => {
    const wrapper = shallow(<NewPrescribedDrugRow drugOrder={rowData} />);
    const tableRow = wrapper.find('.table-row');

    expect(tableRow.children()).to.have.length(5);


    const name = 'Paracetemol , (Tablet(s)),  Oral';
    const schedule = '120 Tablet(s), Twice a day for 12 Day(s) starting 7 Feb 17';
    expect(tableRow.childAt(0).text()).to.eql(name);
    expect(tableRow.childAt(1).text()).to.eql(schedule);
    expect(tableRow.childAt(2).text()).to.eql('2880 Tablet(s)');
    expect(tableRow.childAt(3).text()).to.eql('PRN');
  });

  it('should display the  actions ', () => {
    sinon.stub(Date, 'now', () => rowData.effectiveStartDate);
    const wrapper = shallow(<NewPrescribedDrugRow drugOrder={rowData} />);
    const actionsCol = wrapper.find('.table-actions-active');

    expect(actionsCol.children()).to.have.length(3);
    expect(actionsCol.childAt(0).text()).to.equal('edit');
    expect(actionsCol.childAt(1).text()).to.equal('favorites');
    expect(actionsCol.childAt(2).text()).to.equal('remove');
    Date.now.restore();
  });
});
