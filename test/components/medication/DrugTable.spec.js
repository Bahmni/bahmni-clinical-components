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


  it('should render no treatment message when data is empty', () => {
    const wrapper = shallow(<DrugTable data={[]}/>);
    const tableHeader = wrapper.find('.empty-table');

    expect(tableHeader.text()).to.equal('No Active Treatments present');
  });

  it('should render table sections', () => {
    const data=[{ name: 'TestDrug1', dateActivated: 999973800000 },
      { name: 'TestDrug2', dateActivated: 949973800000 },
      { name: 'testDrug3', dateActivated: 949973800000 }];
    const wrapper = shallow(<DrugTable data={data} activePrescription={false}/>);
    const tableSections = wrapper.find('DrugSection');

    expect(tableSections.get(0).props.header).to.equal(String(data[0].dateActivated));
    expect(tableSections.get(0).props.data).to.deep.equal([data[0]]);

    expect(tableSections.get(1).props.header).to.equal(String(data[1].dateActivated));
    expect(tableSections.get(1).props.data).to.deep.equal([data[1], data[2]]);
  });
});
