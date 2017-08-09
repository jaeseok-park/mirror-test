'use strict';

//var _ = require('lodash');
var PDU = require('../index');
var should = require('chai').should();

//var fixedFormat = require('./fixed.json');
var fixedFormat = require('./test-format.json');
var fixedErrorFormat = require('./fixedError.json');
var variableFormat = require('./variable.json');
var variableErrorFormat = require('./variableError.json');
var fixedPdu;
var variablePdu;

// jshint unused: false
describe('Initialize PDU', function () {
  describe('Fixed length type', function () {
    it('should not throw an errors.', function () {
      (function () {
        var pdu = new PDU(fixedFormat);
      }).should.not.throw();
    });

    it('should throw an exception.', function () {
      (function () {
        var pdu = new PDU(fixedErrorFormat);
      }).should.throw();
    });
  });

  describe('Variable length type', function () {
    it('should not throw an exception.', function () {
      (function () {
        var pdu = new PDU(variableFormat);
      }).should.not.throw();
    });

    it('should throw an exception.', function () {
      (function () {
        var pdu = new PDU(variableErrorFormat);
      }).should.throw();
    });
  });
});

/*
describe('Get the current state', function () {
  var receivedData;

  describe('Check the length of response data.', function () {
    it('should have length of 43.', function (done) {
      port.on('error', function onError(err) {
        should.not.exist(err);
        done(err);
      });

      port.on('data', function onData(data) {
        data.should.have.lengthOf(43);
        receivedData = data;
        console.log(new Buffer(receivedData).toString());
        done();
      });

      port.write('[' + deviceId + 'BTR]');
    });
  });

  describe('Check the proper positions of each byte', function () {
    it('Commas should be located at the exact position.', function () {
      var commaIndexes = [8, 14, 20, 26, 38, 30, 32, 34, 36, 38, 40];

      _.forEach(commaIndexes, function (index) {
        String.fromCharCode(receivedData[index]).should.equal(',');
      });
    });

    it('Numbers should be located at the exact position.', function () {
      var numberIndexes = [[1, 4], [9, 5], [15, 5], [21, 5], 27, 29, 31, 33, 35, 37, 39, 41];

      _.forEach(numberIndexes, function (index) {
        var value;

        if (_.isArray(index)) {
          value = new Buffer(receivedData).toString('ascii', index[0], index[0] + index[1]);
          parseInt(value).should.be.a('number');
        } else {
          receivedData[index].should.be.a('number');
        }
      });
    });

    it('Strings should be located at the exact position.', function () {
      var stringIndexes = [[0, 1, '['], [5, 3, 'BTW'], [42, 1, ']']];

      _.forEach(stringIndexes, function (index) {
        var value = new Buffer(receivedData).toString('ascii', index[0], index[0] + index[1]);

        value.should.equal(index[2]);
      });
    });
  });
});

describe('Repeat requests and responses', function () {
});

describe('Close the port', function () {
  it('All the event listeners should be removed without errors.', function () {
    port.removeAllListeners();
    // TODO: Should be checked it works well without errors.
  });

  it('should be closed without error', function (done) {
    port.close(function onClose(err) {
      should.not.exist(err);

      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
});

describe('Change ID', function () {
  it('should be opened without errors.', function (done) {
    //serialOpts.parser = SerialPort.parsers.raw;

    port = new SerialPort(serialPortFile, serialOpts, function onOpen(err) {
      should.not.exist(err);

      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  it('should succeed changing device ID.', function (done) {
    port.on('data', function onData(data) {
      var good = '[' + deviceId + 'BTwID New:' + newDeviceId + ']';
      var result = new Buffer(data).toString();

      result.should.equal(good);
      done();
    });

    port.write('[' + deviceId + 'BTwID' + newDeviceId + ']');
  });

  it('should succeed changing the device ID back.', function (done) {
    port.removeAllListeners('data');

    port.on('data', function onData(data) {
      var good = '[' + newDeviceId + 'BTwID New:' + deviceId + ']';
      var result = new Buffer(data).toString();

      result.should.equal(good);
      done();
    });

    port.write('[' + newDeviceId + 'BTwID' + deviceId + ']');
  });
});

describe('Close the port', function () {
  it('All the event listeners should be removed without errors.', function () {
    port.removeAllListeners();
    // TODO: Should be checked it works well without errors.
  });

  it('should be closed without error', function (done) {
    port.close(function onClose(err) {
      should.not.exist(err);

      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
});
*/
