'use strict';

const { assert } = require('assertthat');
const path = require('path');
const funcparser = require(path.resolve('./src/module/cli/parsers/func.parser'));

describe('funcparser....', () => {
  it('... is of type function', (done) => {
    assert.that(funcparser).is.ofType('function');
    done();
  });

  it('... returns an empty array when template is not defined', (done) => {
    assert.that(funcparser()).is.equalTo([]);
    done();
  });

  it('... returns an array when process is done', (done) => {
    const code = 'this.i18n.translate("foobar test")';
    const res = funcparser(code);

    assert.that(res.length).is.equalTo(1);
    assert.that(res[0]).is.equalTo('foobar test');
    done();
  });

  it('... returns an array when multiple function calls are present', (done) => {
    const code = 'this.i18n.translate("foobar test"); this.otherFunction.getTranslation("Hello World");';
    const res = funcparser(code);

    assert.that(res.length).is.equalTo(2);
    assert.that(res[0]).is.equalTo('foobar test');
    assert.that(res[1]).is.equalTo('Hello World');
    done();
  });
});
