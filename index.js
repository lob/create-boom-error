'use strict';

var Boom = require('boom');

function createBoomError(name, statusCode, message) {
  var exports = this;

  function ErrorCtor () {
    this.name = name;

    if (typeof message === 'string') {
      this.message = message;
    } else if (typeof message === 'function') {
      this.message = message.apply(undefined, arguments);
    }

    Boom.wrap(this, statusCode);
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
