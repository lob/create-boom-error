'use strict';

var expect = require('chai').expect;
var createBoomError = require('../index');
var CustomErrors = require('./customErrors');

describe('createBoomError', function () {

  it('should create a boom error with a string message', function () {
    var StringError = createBoomError('StringError', 404, 'string message');
    var err = new StringError();
    expect(err instanceof StringError).to.be.true;
    expect(err instanceof Error).to.be.true;
    expect(err.message).to.eql('string message');
    expect(err.output).to.eql({
      statusCode: 404,
      payload: {
        statusCode: 404,
        error: 'Not Found',
        message: 'string message'
      },
      headers: {}
    });
  });

  it('should create a boom error with a function message', function () {
    var FunctionError = createBoomError('FunctionError', 422, function (value) {
      return 'value is ' + value;
    });
    var err = new FunctionError('one');
    expect(err instanceof FunctionError).to.be.true;
    expect(err instanceof Error).to.be.true;
    expect(err.message).to.eql('value is one');
    expect(err.output).to.eql({
      statusCode: 422,
      payload: {
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: 'value is one'
      },
      headers: {}
    });
  });

  it('should create a boom error without a message', function () {
    var EmptyError = createBoomError('EmptyError', 422);
    var err = new EmptyError();
    expect(err instanceof EmptyError).to.be.true;
    expect(err instanceof Error).to.be.true;
    expect(err.output).to.eql({
      statusCode: 422,
      payload: {
        statusCode: 422,
        error: 'Unprocessable Entity'
      },
      headers: {}
    });
  });

  it('should create a boom string message error on exports', function () {
    var err = new CustomErrors.StringError();
    expect(err instanceof CustomErrors.StringError).to.be.true;
  });

  it('should create a boom function message error on exports', function () {
    var err = new CustomErrors.FunctionError();
    expect(err instanceof CustomErrors.FunctionError).to.be.true;
  });

});
