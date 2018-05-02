const expect = require('expect');
const rewire = require('rewire');
const db = rewire('./db');

describe('DB', () => {
  it('should connect to db instance', (done) => {
    var dbSpy = expect.createSpy();
    db.connectAndDo((db,err)=> {
      expect(db).toExist();
      expect(err).toNotExist();
    }).then(() => {
      done();
    }).catch((err) => {
      throw new Error(err);
    });
  });
});
