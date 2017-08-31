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

if (!pkg.scripts) {
  pkg.scripts = {};
}

pkg.scripts['innotec-i18n-extract'] = './node_modules/.bin/innotec-i18n-extract';
pkg.scripts['innotec-i18n-automaticTranslate'] = './node_modules/.bin/innotec-i18n-automaticTranslate';

fs.writeFileSync(path.resolve('./package.json'), JSON.stringify(pkg, null, 2), 'utf8');
