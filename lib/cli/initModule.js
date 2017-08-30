'use strict';

const fs = require('fs');
const path = require('path');
const pkg = require(path.resolve('./package.json'));

// Define defaultconfig in package.json.
pkg.innotecI18nConfig = {
  poeditor: false,
  languages: [
    'de', 'en'
  ],
  appPath: 'src',
  templateExt: 'pug',
  outPath: '/',
  publicPath: '/locale'
};

fs.writeFileSync(path.resolve('./package.json'), JSON.stringify(pkg, null, 2), 'utf8');
