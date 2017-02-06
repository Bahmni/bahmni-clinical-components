import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import DrugTable from 'src/components/medication/DrugTable.jsx';
import fetchMock from 'fetch-mock';

chai.use(chaiEnzyme());


describe.only('DrugTable', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should render column names in the given order', () => {
    const headerNames= ['FirstColumn', 'SecondColumn', 'ThirdColumn'];
    const data=[{}];
    const wrapper = shallow(<DrugTable headers={headerNames} data={data}/>);
    const tableHeader = wrapper.find('.table-header');

    expect(tableHeader.children()).to.have.length(headerNames.length);
    expect(tableHeader.childAt(0).text()).to.equal(headerNames[0]);
    expect(tableHeader.childAt(1).text()).to.equal(headerNames[1]);
    expect(tableHeader.childAt(2).text()).to.equal(headerNames[2]);
  });

  it('should render table sections', () => {
    const headerNames= ['FirstColumn', 'SecondColumn', 'ThirdColumn'];
    const data=[{ name: 'TestDrug1', dateActivated: '10' },
      { name: 'TestDrug2', dateActivated: '10' },
      { name: 'testDrug3', dateActivated: '12' }];
    const wrapper = shallow(<DrugTable headers={headerNames} data={data}/>);
    const tableSections = wrapper.find('DrugSection');

    expect(tableSections.get(0).props.header).to.equal(data[2].dateActivated);
    expect(tableSections.get(0).props.data).to.deep.equal([data[2]]);
    expect(tableSections.get(1).props.data).to.deep.equal([data[0], data[1]]);
  });


});
