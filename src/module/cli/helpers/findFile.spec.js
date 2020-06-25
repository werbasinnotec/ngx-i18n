'use strict';

const { assert } = require('assertthat');
const path = require('path');
const findFile = require(path.resolve('./src/module/cli/helpers/findFile'));

describe('findFile....', () => {
  it('... is of type function', (done) => {
    assert.that(findFile).is.ofType('function');
    done();
  });

  it('... throws an error when function is called without startPath', (done) => {
    assert.that(() => {
      findFile();
    }).is.throwing('Function is called without startPath');
    done();
  });

  it('... throws an error when functin is called without filter argument', (done) => {
    assert.that(() => {
      findFile('/');
    }).is.throwing('Function is called without filter argument');
    done();
  });

  it('... throws an error when the named path does not exist', (done) => {
    assert.that(() => {
      findFile('/notexist', 'pug');
    }).is.throwing('The named path does not exist!');
    done();
  });

  it('... returns an array with all files when process is done', (done) => {
    assert.that(findFile('src/app', 'pug').length).is.greaterThan(0);
    done();
  });
});
