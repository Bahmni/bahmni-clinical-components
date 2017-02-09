import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import DrugSection from 'src/components/medication/DrugSection.jsx';
import { DateUtil } from 'src/helpers/dateUtil';

chai.use(chaiEnzyme());


describe('DrugSection', () => {

  it('should render section with only header and no rows', () => {
   const header = '999973800000';
   const data=[{}];
   const wrapper = shallow(<DrugSection header={header} data={data}/>);
   const sectionHeader = wrapper.find('.table-section-header');
    const headerText = DateUtil.dateFormat(new Date(Number.parseInt(header)));

   expect(sectionHeader.text()).to.equal(headerText);
  });

  it('should render section with header and rows', () => {
   const header = '999973800000';
    const data = [
      {name: 'TestDrug1', dateActivated: header},
      {name: 'TestDrug2', dateActivated: header}];
    const wrapper = shallow(<DrugSection data={data} header={header}/>);
    const sectionHeader = wrapper.find('.table-section-header');

    const headerText = DateUtil.dateFormat(new Date(Number.parseInt(header)));
    const drugRows = wrapper.find('DrugRow');
    expect(sectionHeader.text()).to.equal(headerText);
    expect(drugRows).to.have.length(data.length);
    expect(drugRows.get(0).props.data).to.deep.equal(data[0]);
    expect(drugRows.get(1).props.data).to.deep.equal(data[1]);
  });
});
