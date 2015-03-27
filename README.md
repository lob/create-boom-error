# create-boom-error
[![npm version](https://badge.fury.io/js/create-boom-error.svg)](http://badge.fury.io/js/create-boom-error)
[![Build Status](https://travis-ci.org/lob/create-boom-error.svg)](https://travis-ci.org/lob/create-boom-error)
A simple Node.js library for easily creating classed Boom errors in Hapi applications.

# Installation

`npm install create-boom-error`

# Usage

### `createBoomError(name, statusCode, [message])`

Creates a Boom error.
- `name` - The name of the error.
- `statusCode` - the integer status code of the Boom error
- `message` - an optional string or function which returns a string

### Create a simple error

```js
var createBoomError = require('create-boom-error');

var MyError = createBoomError('MyError', 404, 'simple message');

var err = new MyError();

// err is an instance of MyError making it easy to check in tests
err instanceof MyError // => true
```

### Create an error with a dynamic message

```js
var MyError = createBoomError('MyError', 404, function (num) {
  return 'You must have more than ' + num + ' coins.';
});

var err = new MyError(4);

// err now has the dynamic message
err.message // => 'You must have more than 4 coins.'
```

### Automatically exporting an error

This is a useful shortcut if you have a file in your application where you want to declare all your errors and automatically export them. Simply call `.bind(exports)` when requiring the create-boom-error library.

 ```js
 // in customErrors.js
 var createBoomError = require('create-boom-error').bind(exports);

 createBoomError('TestError', 400, 'test message');
 ```

 This error is automatically exported in `customError.js`:

 ```js
 // in another file
 var CustomErrors = require('./customErrors');

 var err = new CustomErrors.TestError();

 err instanceof CustomErrors.TestError // => true
 ```

# TODO

- [ ] Add to Travis
- [ ] Push to NPM
