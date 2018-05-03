const mongoose = require('../db/mongoose/mongoose');

var WeatherData = mongoose.model('WeatherData', {
  address: {
    type: 'string',
    required : true
  },
  lattitude:{
    type: 'number'
  },
  longitude:{
    type: 'number'
  }
});

module.exports = {
  WeatherData
}
