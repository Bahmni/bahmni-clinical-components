import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { httpInterceptor } from 'src/helpers/httpInterceptor';
import fetchMock from 'fetch-mock';

chai.use(chaiEnzyme());

describe('httpInterceptor', () => {
  describe('get', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('should return response when status is 200', (done) => {
      fetchMock.mock('/someUrl', { data: { id: 1 } });
      httpInterceptor.get('/someUrl')
        .then(res => {
          expect(fetchMock.calls().matched.length).to.eql(1);
          expect(res.data.id).to.eql(1);
          done();
        });
    });

    it('should throw an error when status is not 2xx', (done) => {
      fetchMock.mock('/someUrl', 404);
      httpInterceptor.get('/someUrl', {})
        .then(() => {})
        .catch(err => {
          expect(err.response.status).to.eql(404);
          done();
        });
    });

    it('should return response when status is 200 when url is with params', (done) => {
      fetchMock.mock('/someUrl?a=1&b=2', { data: { id: 1 } });
      httpInterceptor.get('/someUrl', { a: 1, b: 2 })
        .then(res => {
          expect(fetchMock.calls().matched.length).to.eql(1);
          expect(res.data.id).to.eql(1);
          done();
        });
    });

    it('should return response when status is 200 when one params is undefined', (done) => {
      fetchMock.mock('/someUrl', { data: { id: 1 } });
      httpInterceptor.get('/someUrl', { a: undefined })
        .then(res => {
          expect(fetchMock.calls().matched.length).to.eql(1);
          expect(res.data.id).to.eql(1);
          done();
        });
    });

    it('should return response when status is 200 when one params is null', (done) => {
      fetchMock.mock('/someUrl?a', { data: { id: 1 } });
      httpInterceptor.get('/someUrl', { a: null })
        .then(res => {
          expect(fetchMock.calls().matched.length).to.eql(1);
          expect(res.data.id).to.eql(1);
          done();
        });
    });

    it('should return response when status is 200 when one params is an array', (done) => {
      fetchMock.mock('/someUrl?a=1&a=2', { data: { id: 1 } });
      httpInterceptor.get('/someUrl', { a: [1, 2] })
        .then(res => {
          expect(fetchMock.calls().matched.length).to.eql(1);
          expect(res.data.id).to.eql(1);
          done();
        });
    });

    it('should return response when status is 200 when one params is an array' +
      ' and has undefined as one of the value', (done) => {
      fetchMock.mock('/someUrl?a=1&a=2', { data: { id: 1 } });
      httpInterceptor.get('/someUrl', { a: [1, 2, undefined] })
        .then(res => {
          expect(fetchMock.calls().matched.length).to.eql(1);
          expect(res.data.id).to.eql(1);
          done();
        });
    });

    it('should return response when status is 200 when one params is an array' +
      ' and has null as one of the value', (done) => {
      fetchMock.mock('/someUrl?a=1&a=2&a', { data: { id: 1 } });
      httpInterceptor.get('/someUrl', { a: [1, 2, null] })
        .then(res => {
          expect(fetchMock.calls().matched.length).to.eql(1);
          expect(res.data.id).to.eql(1);
          done();
        });
    });
  });
});
