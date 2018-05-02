const expect = require('expect');
const request = require('supertest');
const rewire = require('rewire');
const app = rewire('./server');

describe('Server', function() {
  this.timeout(15000);
  describe('GET /', () => {
    it('should render weather data',(done) => {
      // app.__set__('res.render',expect.createSpy());
      request(app).get('/').expect(200).end(done);
    });
  });
});
