'use strict';

var _ = require('lodash');
var ajv = new require('ajv')({ useDefaults: true });
var logger = require('log4js').getLogger('PDU');

//var schema = require('./schema.json');
var schema = require('./test/test-schema.json');

var supportedTypes = ['string', 'uint', 'int', 'float', 'double', 'bytes'];

/**
 * format
 * {
 *   endian: 'little'(default) | 'big',
 *   row: {
 *     length: <field name which has the length:> string | <fixed data length:> int,
 *     delimiter: string,
 *   },
 *   fields: [
 *     {
 *       name: <field name:> string,
 *       type: 'string' | 'uint' | 'int' | 'float' | 'double' | 'bytes',
 *       length: <data length: int>,
 *       delimiter: string
 *     },
 *     {
 *       ...
 *     }
 *   ]
 * }
 */

function PDU(format, data) {
  this.format = format;

  if (!this.validateFormat()) {
    throw new Error('Bad format');
  }

  if (!_.isUndefined(data)) {
    if (Buffer.isBuffer(data)) {
      this.buffer = this.parse(data);
    } else if (_.isObject(data)) {
      this.data = this.serialize(data);
    } else {
      throw new Error('The 2nd argument should be a Buffer or an Object.');
    }
  }
}

PDU.prototype.validateFormat = function (format) {
  if (this.format) {
    format = this.format;
  }

  return ajv.validate(schema, format);
};

PDU.prototype.parse = function (buffer) {
  var self = this;
  var index = 0;
  var endian = format && format.endian || 'little';
  var length;

  if (!_.isBuffer(buffer)) {
    throw new Error('The argument is not a Buffer');
  }

  if (!format) {
    throw new Error('No data format');
  }

  self.data = {};

  _.forEach(format.fields, function parseEach(field) {
    var convert;
    var cond;

    if (_.indexOf(supportedTypes, field.type) === -1) {
      logger.warn('Unsupported field type:', field.type);
      return;
    }

    switch (field.type) {
      case 'string':
        self.data[field.name] = buffer.toString('utf8', index);
        index += field.length;
        break;
      case 'bytes':
        self.data[field.name] = new Buffer(field.length);
        buffer.copy(self.data[field.name], index, index + field.length);
        index += field.length;
        break;
      case 'int':
      case 'unit':
      case 'float':
      case 'double':
        cond = field.type + field.length + endian;
//         switch (cond) {
//           case 'int
        break;
      default:
        logger.warn('Unsupported field type:', field.type);
        return;
    }
  });
};
