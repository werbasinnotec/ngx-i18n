'use strict';

const assert = require('assertthat');
const path = require('path');
const findFile = require(path.resolve('./lib/cli/helpers/findFile'));

describe('findFile....', () => {
  it('... is of type function', (done) => {
    assert.that(findFile).is.ofType('function');
    done();
  });
});
