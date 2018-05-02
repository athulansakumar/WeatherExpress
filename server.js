const express = require('express');
const hbs = require('hbs');
const weather = require('./weather/weather.js');
const db = require('./db/db.js');
const { properties, logger, argv } =  require('./utils/utils.js');

const port = argv.port || properties.get('port') || 8080;

const app = express();
app.set('view name','hbs');
hbs.registerPartials(`${__dirname}/views/partials`);
app.use(express.static(`${__dirname}/node_modules/bootstrap/dist`));

app.get('/',(req,res) => {
  logger.debug('Get / method called');
  var location = req.params.location;
  if(!location) location = 'nettoor,kerala';
  weather.geocodeAddress(location).then((data) =>{
    logger.debug('fetched geocode data');
    db.saveLocationData(data).then(() => {
      logger.debug('saved location data');
    }).catch((err) => {
      logger.debug('cant save location data',err);
    });
    return weather.getWeatherInfo(data);
  }).then((data) => {
    logger.debug('fetched weather data');
    res.render('home.hbs',{ title: 'Home Page', weather: data});
  }).catch((err) => {
    logger.debug('some error occured',err);
    res.render('home.hbs',{ title: 'Home Page', errorMessage: 'Could Not fetch Data'});
  });
});

app.listen(port, () => {
  console.log('Application is up in port',port);
  logger.debug('Application is up in port',port);
});

module.exports = app;
