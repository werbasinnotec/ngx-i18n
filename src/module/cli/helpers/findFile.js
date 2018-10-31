'use strict';

const path = require('path');
const fs = require('fs');

const findFilesInDir = (startPath, filter) => {
    if (!startPath) {
      throw new Error('Function is called without startPath');
    }

    if (!filter) {
      throw new Error('Function is called without filter argument');
    }

    let results = [];

    if (!fs.existsSync(startPath)) {
      throw new Error('The named path does not exist!');
    }

    const files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
          results = results.concat(findFilesInDir(filename, filter));
        } else if (filename.indexOf(filter) >= 0) {
          results.push(filename);
        }
    }

    return results;
};

module.exports = findFilesInDir;
