const {expect} = require('chai');
const {properties, logger, argv} = require('./utils');

describe('Util Functions', () => {
  it('should have created properties object',() => {
    expect(properties).to.exist;
    expect(properties).to.not.be.empty;
  });
  it('should have created logger object',() => {
    expect(logger).to.exist;
  });
  it('should have created argv object', () => {
    expect(argv).to.exist;
  });
});
