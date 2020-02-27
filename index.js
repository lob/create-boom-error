'use strict';

const Boom = require('@hapi/boom');

/**
 *
 * @param {string} name
 * @param {number} statusCode
 * @param {function | string} message
 * @returns {new () => Boom<null>}
 */
function createBoomError(name, statusCode, message) {
  var exports = this;

  function ErrorCtor () {
    this.name = name;

    this.message = undefined;
    if (typeof message === 'string') {
      this.message = message;
    } else if (typeof message === 'function') {
      this.message = message.apply(undefined, arguments);
    }

    Boom.boomify(this, { statusCode, });

    if (message == undefined) {
      Reflect.deleteProperty(this.output.payload, 'message');
    }
  }

  ErrorCtor.prototype = Object.create(Error.prototype);
  ErrorCtor.prototype.constructor = ErrorCtor;
  ErrorCtor.prototype.name = name;

  if (exports) {
    exports[name] = ErrorCtor;
  }

  return ErrorCtor;
}

module.exports = createBoomError;
