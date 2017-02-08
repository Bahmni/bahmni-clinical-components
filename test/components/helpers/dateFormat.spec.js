import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { dateFormat } from 'src/helpers/dateFormat';

chai.use(chaiEnzyme());

describe('date format', () => {
  it('should set the date to today by default', () => {
    const date = dateFormat();
    const today = new Date();

    const dateInString = `${today.getDate()}` + ' ' +
      `${today.toLocaleString('en', { month: 'short' })}` + ' ' +
      `${today.toLocaleString('en', { year: '2-digit' })}`;

    expect(date).to.equal(dateInString);
  });

  it('should the previous date in required format', () => {
    const date = dateFormat('2017-02-01');

    expect(date).to.equal('1 Feb 17');
  });
});
