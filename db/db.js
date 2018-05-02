const MongoClient = require('mongodb');
const {properties, logger} = require('../utils/utils');


var dbconnection = properties.get('dbconnection');

var connectAndDo = (perform) => {
  return new Promise((resolve,reject) => {
    MongoClient.connect(dbconnection,(error,client) => {
      if(error){
        logger.error('Cant connect to db',error);
        return reject('cant connect to db');
      }
      var db = client.db('WeatherDB');
      perform(db,error);
      db.close();
      resolve();
    });
  });
};

var saveLocationData = (location, callback) => {
  return connectAndDo((db) => {
    db.collection('Locations').insertOne(location,(err, res) => {
      if(err){
        logger.error('Insert Failed',err);
        return;
      }
      logger.debug('Inserted Successfully',res.ops);
    });
  })
};


module.exports = {
  saveLocationData,
  connectAndDo
}
