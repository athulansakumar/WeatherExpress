var mongoose = require('mongoose');
const {properties, logger} = require('../../utils/utils');

var dbconnection = properties.get('dbconnection');

mongoose.Promise = global.Promise;
mongoose.connect(dbconnection);

module.exports = mongoose;
