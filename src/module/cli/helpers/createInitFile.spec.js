'use strict';

const assert = require('assertthat');
const path = require('path');
const fs = require('fs');
const createInitFile = require(path.resolve('./src/module/cli/helpers/createInitFile'));

describe('createInitFile....', () => {
  before(() => {
    const file = './test/message.init.json';

    if (fs.existsSync(file)) {
      fs.unlinkSync(path.resolve(file));
    }
  });

  it('... is of type function', (done) => {
    assert.that(createInitFile).is.ofType('function');
    done();
  });

  it('... rejects an error when obj is not defined', (done) => {
    (async () => {
      try {
        await createInitFile();
      } catch (err) {
        assert.that(err).is.equalTo('Function is called without obj');
        done();
      }
    })();
  });

  it('... rejects an error when path is not defined', (done) => {
    (async () => {
      try {
        await createInitFile({});
      } catch (err) {
        assert.that(err).is.equalTo('Function is called without path');
        done();
      }
    })();
  });

  it('... resolves true when process is done', (done) => {
    (async () => {
      try {
        const res = await createInitFile({}, './test/');

        assert.that(res).is.true();
        done();
      } catch (err) {
        throw err;
      }
    })();
  });
});
