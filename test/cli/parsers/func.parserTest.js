'use strict';

const assert = require('assertthat');
const path = require('path');
const funcparser = require(path.resolve('./lib/cli/parsers/func.parser'));

describe('funcparser....', () => {
  it('... is of type function', (done) => {
    assert.that(funcparser).is.ofType('function');
    done();
  });

  it('... throws an error when function is called without template', (done) => {
    assert.that(() => {
      funcparser();
    }).is.throwing('Function is called without template');
    done();
  });
});
