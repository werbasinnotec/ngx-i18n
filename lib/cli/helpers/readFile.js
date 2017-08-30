'use strict';

const fs = require('fs');

const readFile = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject('Error: Function is called without a filename!');
    }

    try {
      const content = fs.readFileSync(file, 'utf8');

      resolve(content);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = readFile;
