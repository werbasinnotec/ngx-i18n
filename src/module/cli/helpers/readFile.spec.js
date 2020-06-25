'use strict';

const { assert } = require('assertthat');
const path = require('path');
const readFile = require(path.resolve('./src/module/cli/helpers/readFile'));

describe('readFile....', () => {
  it('... is of type function', (done) => {
    assert.that(readFile).is.ofType('function');
    done();
  });

  it('... rejects an error when function is called without a filename', (done) => {
    (async () => {
      try {
        await readFile();
      } catch (err) {
        assert.that(err).is.equalTo('Error: Function is called without a filename!');
        done();
      }
    })();
  });

  it('... rejects an error when the file is not found', (done) => {
    (async () => {
      try {
        await readFile('not.exist');
      } catch (err) {
        assert.that(err.code).is.equalTo('ENOENT');
        done();
      }
    })();
  });

  it('... resolves the content when process is done', (done) => {
    (async () => {
      try {
        const content = await readFile(path.resolve('./package.json'));

        assert.that(content).is.not.undefined();
        done();
      } catch (err) {
        throw err;
      }
    })();
  });
});
