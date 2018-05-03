const {expect} = require('chai');

const weather = require('./weather');

describe('Weather',function() {
  this.timeout(15000);
  it('should fetch longitude, latitude for address', (done) => {
      weather.geocodeAddress('nettoor,kerala').then((data) => {
        expect(data).to.have.all.keys('address','lattitude','longitude');
        done();
      }).catch((err) => {
        done(new Error(err));
      });
  });

  it('should fetch weather information',(done) =>{
    var location = {
      address:  'Some Place',
      lattitude: '9.9282678',
      longitude: '76.31451880000002'
    };
    weather.getWeatherInfo(location).then((data) => {
      try {
        expect(data).to.have.all.keys('address','summary','temperature');
        done();
      } catch (e) {
        done(e);
      }
    }).catch((msg) => {
      done(new Error(msg));
    });
  });

});
