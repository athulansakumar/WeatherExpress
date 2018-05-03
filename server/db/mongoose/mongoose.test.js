const {properties, logger} = require('../../utils/utils');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect;

chai.use(chaiAsPromised);

var dbconnection = properties.get('dbconnection');

describe('DB', ()=>{
  it('should connect to mongo DB', (done) => {
      expect(mongoose.connect(dbconnection)).to.be.eventually.fulfilled.and.notify(done);
  });
});
