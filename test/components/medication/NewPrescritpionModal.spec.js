import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import NewPrescriptionModal from 'src/components/medication/NewPrescriptionModal.jsx';
import fetchMock from 'fetch-mock';

chai.use(chaiEnzyme());


describe('NewPrescriptionModal', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should render NewPrescriptionModal with the given props', () => {
    const wrapper = new ReactWrapper(mount(<NewPrescriptionModal drug={{ name: 'paracetamol' }} treatmentConfig={{}} />).instance().modalRef, true);
    expect(wrapper.find('Measurement').length).to.equal(3);
    expect(wrapper.find('Select').length).to.equal(5);
  });
});
