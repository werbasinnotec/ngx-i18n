'use strict';

const path = require('path');
const fs = require('fs');

const createInitFile = async (obj, fpath) => {
  return new Promise((resolve, reject) => {
    if (!obj) {
      return reject('Function is called without obj');
    }

    if (!fpath) {
      return reject('Function is called without path');
    }

    const file = './' + fpath + '/messages.init.json';

    fs.writeFileSync(path.resolve(file), JSON.stringify(obj, null, 2), 'utf8');

    resolve(true);
  });
};

module.exports = createInitFile;
