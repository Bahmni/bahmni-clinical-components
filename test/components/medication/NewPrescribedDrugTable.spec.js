import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import NewPrescribedDrugTable from 'src/components/medication/NewPrescribedDrugTable.jsx';
import { DrugOrder } from 'src/helpers/DrugOrder';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

chai.use(chaiEnzyme());


describe.only('NewPrescribedDrugTable', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const drugOrder1 = new DrugOrder({
    drug: {
      name: 'Ibuprofen',
      form: 'Tablet(s)',
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

  const drugOrder2 = new DrugOrder({
    drug: {
      name: 'Paracetemol',
      form: 'Tablet(s)',
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

  it('should render column names in the given order', () => {
    const headerNames = [
      'Drug Information - <span className="table__cell--extraInfo">Name, Form, Route</span>',
      'Schedule - <span className="table__cell--extraInfo">Dosage, Frequency, Duration</span>',
      'Total Qty',
      'Instructions',
      'Action'];
    const data = [{}];
    const wrapper = shallow(<NewPrescribedDrugTable drugOrderList={data} />);
    const tableHeader = wrapper.find('.table__row');

    expect(tableHeader.children()).to.have.length(5);
    expect(tableHeader.childAt(0).props().dangerouslySetInnerHTML.__html).to.equal(headerNames[0]);
    expect(tableHeader.childAt(1).props().dangerouslySetInnerHTML.__html).to.equal(headerNames[1]);
    expect(tableHeader.childAt(2).props().dangerouslySetInnerHTML.__html).to.equal(headerNames[2]);
    expect(tableHeader.childAt(3).props().dangerouslySetInnerHTML.__html).to.equal(headerNames[3]);
    expect(tableHeader.childAt(4).props().dangerouslySetInnerHTML.__html).to.equal(headerNames[4]);
  });

  it('should render table sections', () => {
    const data = [drugOrder1, drugOrder2];
    const wrapper = shallow(<NewPrescribedDrugTable drugOrderList={data} />);
    const rows = wrapper.find('NewPrescribedDrugRow');

    expect(rows.length).to.equal(2);
    expect(rows.get(0).props.drugOrder).to.deep.equal(data[0]);
    expect(rows.get(1).props.drugOrder).to.deep.equal(data[1]);
  });

  it('should not update the component when the drug list is same', () => {
    const spy = sinon.spy(NewPrescribedDrugTable.prototype, 'shouldComponentUpdate');
    const data = [drugOrder1];
    const wrapper = shallow(<NewPrescribedDrugTable drugOrderList={data} />);
    wrapper.setProps({ drugOrderList: [drugOrder1] });

    expect(spy.calledOnce).to.equal(true);
    expect(spy.returnValues[0]).to.equal(false);
    spy.restore();
  });

  it('should update the component when the drug list is changed', () => {
    const spy = sinon.spy(NewPrescribedDrugTable.prototype, 'shouldComponentUpdate');
    const data = [drugOrder1];
    const wrapper = shallow(<NewPrescribedDrugTable drugOrderList={data} />);
    wrapper.setProps({ drugOrderList: [drugOrder2] });

    expect(spy.calledOnce).to.equal(true);
    expect(spy.returnValues[0]).to.equal(true);
    spy.restore();
  });

  it('should not update the component when the headers are same', () => {
    const spy = sinon.spy(NewPrescribedDrugTable.prototype, 'shouldComponentUpdate');
    const data = ['Drug Information', 'Schedule'];
    const wrapper = shallow(<NewPrescribedDrugTable drugOrderList={[drugOrder1]} headers={data} />);
    wrapper.setProps({ headers: ['Drug Information', 'Schedule'] });

    expect(spy.calledOnce).to.equal(true);
    expect(spy.returnValues[0]).to.equal(false);
    spy.restore();
  });

  it('should update the component when the headers are changed', () => {
    const spy = sinon.spy(NewPrescribedDrugTable.prototype, 'shouldComponentUpdate');
    const data = ['Drug Information', 'Schedule'];
    const wrapper = shallow(<NewPrescribedDrugTable drugOrderList={[drugOrder1]} headers={data} />);
    wrapper.setProps({ headers: ['Drug Information', 'Schedule', 'Total Qty'] });

    expect(spy.calledOnce).to.equal(true);
    expect(spy.returnValues[0]).to.equal(true);
    spy.restore();
  });
});
