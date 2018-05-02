const expect = require('expect');
const {properties, logger, argv} = require('./utils');

describe('Util Functions', () => {
  it('should have created properties object',() => {
    expect(properties).toExist();
    expect(properties.get('port')).toExist();
  });
  it('should have created logger object',() => {
    expect(logger).toExist();
  });
  it('should have created argv object', () => {
    expect(argv).toExist();
  });
});
