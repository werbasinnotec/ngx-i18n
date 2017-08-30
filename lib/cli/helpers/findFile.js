'use strict';

const path = require('path');
const fs = require('fs');

const findFilesInDir = (startPath, filter) => {
    let results = [];

    if (!fs.existsSync(startPath)) {
        console.log('no dir', startPath);
        return;
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
