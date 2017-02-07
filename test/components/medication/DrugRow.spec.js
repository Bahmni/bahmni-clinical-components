import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';

import DrugRow from 'src/components/medication/DrugRow.jsx';
import { prescriptionStatus } from 'src/constants';

chai.use(chaiEnzyme());

describe('DrugRow', () => {
  const rowData = {
    drug: {
      name: 'drug1',
      form: 'form1',
    },
    creatorName: 'testUser',
    dosingInstructions: {
      route: 'oral',
      dose: 12,
      doseUnits: 'tabs',
      frequency: 'Once a day',
      quantity: 24,
      quantityUnits: 'tabs',
      administrationInstructions: `{"instructions": "Do not take this medicine"}`,
    },
    duration: 2,
    durationUnits: 'Day(s)',
    effectiveStartDate: 1485282600000,
    effectiveStopDate: 1485455399000,
  };

  it('should render empty row when data is absent', () => {
    const wrapper = shallow(<DrugRow data={{}}/>);
    const tableRow = wrapper.find('.table-row');
    expect(tableRow).to.have.length(0);
  });

  it('should render row with the appropriate data', () => {
    const firstColumn = `${rowData.drug.name}, ${rowData.drug.form}, ${rowData.dosingInstructions.route}`;
    const secondColumn = '12 tabs, Once a day for 2 Day(s) started on 25 Jan 17 by testUser';
    const thirdColumn = '24 tabs';
    const fourthColumn = ' Do not take this medicine ';
    const wrapper = shallow(<DrugRow data={rowData}/>);
    const tableRow = wrapper.find('.table-row');

    expect(tableRow.children()).to.have.length(6);

    expect(tableRow.childAt(0).text()).to.eql(firstColumn);
    expect(tableRow.childAt(1).text()).to.eql(secondColumn);
    expect(tableRow.childAt(2).text()).to.eql(thirdColumn.toString());
    expect(tableRow.childAt(3).text()).to.eql(fourthColumn);
  });

  describe('Status and Actions', () => {
    it('should display the active actions when the status is active', () => {
      sinon.stub(Date, 'now', () => rowData.effectiveStartDate);
      const wrapper = shallow(<DrugRow data={rowData}/>);
      const statusCol = wrapper.find('.col4');
      const actionsCol = wrapper.find('.table-actions-active');

      expect(statusCol.text()).to.equal(prescriptionStatus.Active);
      expect(actionsCol.children()).to.have.length(3);
      expect(actionsCol.childAt(0).text()).to.equal('revise');
      expect(actionsCol.childAt(1).text()).to.equal('stop');
      expect(actionsCol.childAt(2).text()).to.equal('renew');
      Date.now.restore();
    });

    it('should display the scheduled actions when the status is scheduled', () => {
      sinon.stub(Date, 'now', () => rowData.effectiveStartDate-1);
      const wrapper = shallow(<DrugRow data={rowData}/>);
      const statusCol = wrapper.find('.col4');
      const actionsCol = wrapper.find('.table-actions-active');

      expect(statusCol.text()).to.equal(prescriptionStatus.Scheduled);
      expect(actionsCol.children()).to.have.length(3);
      expect(actionsCol.childAt(0).text()).to.equal('revise');
      expect(actionsCol.childAt(1).text()).to.equal('stop');
      expect(actionsCol.childAt(2).text()).to.equal('renew');
      Date.now.restore();
    });

    it('should display the stopped actions when the status is stopped', () => {
      const data = Object.assign({}, rowData, { dateStopped: 1485282700000 });
      const wrapper = shallow(<DrugRow data={data}/>);
      const statusCol = wrapper.find('.col4');
      const actionsCol = wrapper.find('.table-actions-finished');

      expect(statusCol.text()).to.equal(prescriptionStatus.Stopped + '<StoppedReason />');
      expect(actionsCol.children()).to.have.length(1);
      expect(actionsCol.childAt(0).text()).to.equal('add');
    });

    it('should display the finished actions when the status is finished', () => {
      sinon.stub(Date, 'now', () => rowData.effectiveStopDate+1);
      const wrapper = shallow(<DrugRow data={rowData}/>);
      const statusCol = wrapper.find('.col4');
      const actionsCol = wrapper.find('.table-actions-finished');

      expect(statusCol.text()).to.equal(prescriptionStatus.Finished);
      expect(actionsCol.children()).to.have.length(1);
      expect(actionsCol.childAt(0).text()).to.equal('add');
    });
  });
});
