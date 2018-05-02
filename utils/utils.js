const yargs = require('yargs');
const logger = require('winston');
const PropertiesReader  = require('properties-reader');
const properties = PropertiesReader(`${__dirname}/../system.properties`);

logger.configure({
    level:'debug',
    transports: [
      new (logger.transports.File)({ filename: 'applogs.log' })
    ]
});

const argv = yargs
  .options({
    p:{
      description : 'port to run app',
      demand : false,
      number: true,
      alias : 'port'
    }
  })
  .argv;

  module.exports = {
    properties,
    logger,
    argv
  }
