'use strict';

const readFile = require('./readFile');
const fs = require('fs');
const path = require('path');

const createorupdateLangfile = async (fpath, lang, keys) => {
  return new Promise((resolve, reject) => {
    if (!fpath) {
      return reject('Function is called without path');
    }

    if (!lang) {
      return reject('Function is called without language');
    }

    if (!keys) {
      return reject('Function is called without keys');
    }

    const file = './' + fpath + '/messages.' + lang.code + '.json';

    (async () => {
      try {
        console.log('** --------------------------------');
        console.log('** Process: Write new Languagefiles');

        const content = JSON.parse(await readFile(path.resolve(file)));

        for (let i = 0; i < keys.length; i++) {
          const index = content.map((d) => {
            return d.term;
          }).indexOf(keys[i].term);

          if (index === -1) {
            content.push(keys[i]);
          }
        }

        for (let i = 0; i < content.length; i++) {
          const index = keys.map((d) => {
            return d.term;
          }).indexOf(content[i].term);

          if (index === -1) {
            content.splice(i, 1);
          }
        }

        fs.writeFileSync(path.resolve(file), JSON.stringify(content, null, 2), 'utf8');
        console.log('** Languagefile ' + file + ' is written sucessfully');

        resolve(true);
      } catch (err) {
        if (err.code === 'ENOENT') {
          fs.writeFileSync(path.resolve(file), JSON.stringify(keys, null, 2), 'utf8');

          console.log('** Languagefile ' + file + ' not found, create a new one');

          return resolve(true);
        }

        return reject(err);
      }
    })();
  });
};

module.exports = createorupdateLangfile;
