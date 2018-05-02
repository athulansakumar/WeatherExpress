const axios = require('axios');
const {properties, logger} = require('../utils/utils.js');

const geocodeKey = properties.get('geocode.key');
const weatherKey = properties.get('weather.key');

var geocodeAddress = (address) => {
  return new Promise((resolve,reject) =>{
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${geocodeKey}`).then((body) => {
      // logger.info('geocode address respose ',body);
      if(body.statusText === 'OK'){
        resolve({
          address:  body.data.results[0].formatted_address,
          lattitude: body.data.results[0].geometry.location.lat,
          longitude: body.data.results[0].geometry.location.lng
        });
      }else{
        throw new Error(`Status is ${body.status}`);
      }
    }).catch((err) => {
      logger.error('geocode address error ',err);
      reject('Unable to get data.');
    });
  });
};

var getWeatherInfo = (location) => {
  return new Promise((resolve,reject) => {
    axios.get(`https://api.darksky.net/forecast/${weatherKey}/${location.lattitude},${location.longitude}?units=si`)
    .then((body) => {
      // logger.info('weather info response ',body);
      resolve({
        address: location.address,
        summary: body.data.currently.summary,
        temperature: body.data.currently.temperature
      });
    }).catch((err) => {
      logger.error('weather info error ',err);
      reject('Unable to get wether info');
    });
  });
};

module.exports = {
  getWeatherInfo,
  geocodeAddress
}
