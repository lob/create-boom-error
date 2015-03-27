'use strict';

var createBoomError = require('../index').bind(exports);

createBoomError('StringError', 400, 'string message');

createBoomError('FunctionError', 400, function (value) {
  return 'value is ' + value;
});
