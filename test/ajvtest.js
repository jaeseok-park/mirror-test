'use strict';

var should = require('chai').should();
var ajv = new require('ajv')({ useDefaults: true});
var schema = require('./test-schema.json');
var format = require('./test-format.json');

// jshint unused: false
describe('Simple Test', function () {
  it('should not throw an exception.', function () {
    (function () {
      var isValid = ajv.validate(schema, format);
    }).should.not.throw();
  });
});
