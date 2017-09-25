'use strict';

const fs = require('fs');
const request = require('request');

const downloadAndSave = (url, dest, cb) => {
  console.log('** Download Languagefile');

  const file = fs.createWriteStream(dest);
  const sendReq = request.get(url);

  sendReq.on('response', (response) => {
      if (response.statusCode !== 200) {
          return cb('Response status was ' + response.statusCode);
      }
  });

  sendReq.on('error', (err) => {
      fs.unlink(dest);
      return cb(err.message);
  });

  sendReq.pipe(file);

  file.on('finish', () => {
      file.close(cb);
  });

  file.on('error', (err) => {
      fs.unlink(dest);

      return cb(err.message);
  });
};

module.exports = downloadAndSave;
