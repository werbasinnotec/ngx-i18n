'use strict';

const { assert } = require('assertthat');
const path = require('path');
const pipeparser = require(path.resolve('./src/module/cli/parsers/pipe.parser'));

describe('pipeparser....', () => {
  it('... is of type function', (done) => {
    assert.that(pipeparser).is.ofType('function');
    done();
  });

  it('... throws an error when function is called without template', (done) => {
    assert.that(() => {
      pipeparser();
    }).is.throwing('Function is called without template');
    done();
  });

  it('... returns an array when process is done', (done) => {
    const template = 'span {{ "I am a translated text." | i18n_translate }}';

    assert.that(pipeparser(template).length).is.equalTo(1);
    done();
  });
});
