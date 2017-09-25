'use strict';

const assert = require('assertthat');
const path = require('path');
const fs = require('fs');
const createorupdateLangfile = require(path.resolve('./lib/cli/helpers/createorupdateLangfile'));

describe('createorupdateLangfile....', () => {
  before(() => {
    const file = './test/message.de.json';

    if (fs.existsSync(file)) {
      fs.unlinkSync(path.resolve(file));
    }
  });

  it('... is of type function', (done) => {
    assert.that(createorupdateLangfile).is.ofType('function');
    done();
  });

  it('... rejects an error when function is called without path', (done) => {
    (async () => {
      try {
        await createorupdateLangfile();
      } catch (err) {
        assert.that(err).is.equalTo('Function is called without path');
        done();
      }
    })();
  });

  it('... rejects an error when function is called without lang', (done) => {
    (async () => {
      try {
        await createorupdateLangfile('/');
      } catch (err) {
        assert.that(err).is.equalTo('Function is called without language');
        done();
      }
    })();
  });

  it('... rejects an error when function is called without keys', (done) => {
    (async () => {
      try {
        await createorupdateLangfile('/', 'de');
      } catch (err) {
        assert.that(err).is.equalTo('Function is called without keys');
        done();
      }
    })();
  });

  it('... must resolve true when process is done', (done) => {
    (async () => {
      const prop = [{
                      term: 'I am a translated text.',
                      context: 'getting-started.pug'
                     },
                     {
                       term: 'Attention! I love Innotec...',
                       context: 'getting-started.pug'
                     },
                     {
                       term: '@innotec/ngx-i18n',
                       context: 'header.component.pug'
                     }];

      try {
        const res = await createorupdateLangfile('/test', 'de', prop, true);

        assert.that(res).is.true();
        done();
      } catch (err) {
        throw err;
      }
    })();
  });

  it('... must resolve true when process is done on update', (done) => {
    (async () => {
      const prop = [{
                      term: 'I am a fine translated text.',
                      context: 'getting-started.pug'
                     },
                     {
                       term: 'Attention! I love Innotec...',
                       context: 'getting-started.pug'
                     }];

      try {
        const res = await createorupdateLangfile('/test', 'de', prop);

        assert.that(res).is.true();
        done();
      } catch (err) {
        throw err;
      }
    })();
  });
});
