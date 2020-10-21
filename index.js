'use strict';

const Boom       = require('@hapi/boom');
const Decamelize = require('decamelize');

/**
 *
 * @param {string} name
 * @param {number} statusCode
 * @param {function | string} message
 * @param {string} code
 * @returns {new () => Boom<null>}
 */
function createBoomError(name, statusCode, message, code) {
  var exports = this;

  function ErrorCtor () {
    this.name = name;
    if (code) {
      this.code = code;
    } else {
      this.code = Decamelize(name);
    }

    this.message = undefined;
    if (typeof message === 'string') {
      this.message = message;
    } else if (typeof message === 'function') {
      this.message = message.apply(null, arguments);
    }

    Boom.boomify(this, { statusCode });

    if (!message) {
      Reflect.deleteProperty(this.output.payload, 'message');
    }
  };

  ErrorCtor.prototype = Object.create(Error.prototype);
  ErrorCtor.prototype.constructor = ErrorCtor;
  ErrorCtor.prototype.name = name;

  if (exports) {
    exports[name] = ErrorCtor;
  }

  return ErrorCtor;
}

module.exports = createBoomError;
