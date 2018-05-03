const { properties, logger, argv } =  require('../utils/utils.js');
const {WeatherData} = require('../models/weatherData');
const app = require('../server.js');
const weather = require('../weather/weather.js');

var configureRoutes = (app) => {
  app.get('/',(req,res) => {
    logger.debug('Get / method called');
    var location = req.params.location;
    if(!location) location = 'bangalore,karnataka';
    weather.geocodeAddress(location).then((data) =>{
      logger.debug('fetched geocode data');
      var weatherData = new WeatherData(data);
      return weatherData.save();
    }).then((data) => {
      return weather.getWeatherInfo(data);
    }).then((data) => {
      logger.debug('fetched weather data');
      res.render('home.hbs',{ title: 'Home Page', weather: data});
    }).catch((err) => {
      logger.debug('some error occured',err);
      res.render('home.hbs',{ title: 'Home Page', errorMessage: 'Could Not fetch Data'});
    });
  });

  app.get('/test', (req,res) => {
    var data = WeatherData({ address: 'testAddress', lattitude: 12345, longitude: 6789 });
    data.save().then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  });
};

module.exports = {
  configureRoutes
};
