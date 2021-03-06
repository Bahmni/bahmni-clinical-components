import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import DrugTable from 'src/components/medication/DrugTable.jsx';
import fetchMock from 'fetch-mock';
import { DateUtil } from 'src/helpers/DateUtil';
import moment from 'moment';

chai.use(chaiEnzyme());


describe.only('DrugTable', () => {
  afterEach(() => {
    fetchMock.restore();
  });


  it('should render no treatment message when data is empty', () => {
    const wrapper = shallow(<DrugTable data={[]} />);
    const tableHeader = wrapper.find('.empty-table');

    expect(tableHeader.text()).to.equal('No Active Treatments present');
  });

  it('should render table sections', () => {
    const data = [
      { name: 'TestDrug1', dateActivated: moment('2001-09-08').valueOf() },
      { name: 'TestDrug2', dateActivated: moment('2001-07-12').valueOf() },
      { name: 'testDrug3', dateActivated: moment('2001-07-12').valueOf() },
    ];
    const wrapper = shallow(<DrugTable data={data} />);
    const tableSections = wrapper.find('DrugSection');
    const onlyDay = DateUtil.dateWithoutTime(new Date(data[1].dateActivated)).valueOf();

    expect(tableSections.get(0).props.header).to.equal(String(data[0].dateActivated));
    expect(tableSections.get(0).props.data).to.deep.equal([data[0]]);

    expect(tableSections.get(1).props.header).to.equal(String(onlyDay));
    expect(tableSections.get(1).props.data).to.deep.equal([data[1], data[2]]);
  });
});
