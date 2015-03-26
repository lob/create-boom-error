'use strict';

var createBoomError = require('../index');

createBoomError('StringError', 400, 'string message', exports);

createBoomError('FunctionError', 400, function (value) {
  return 'value is ' + value;
}, exports);
