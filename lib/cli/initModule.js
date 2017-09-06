'use strict';

const fs = require('fs');
const path = require('path');
const pkg = require(path.resolve('./package.json'));

// Define defaultconfig in package.json.
pkg.innotecI18nConfig = {
  poeditor: false,
  languages: [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' }
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
pkg.scripts['innotec-i18n-poeditorimport'] = './node_modules/.bin/innotec-i18n-poeditorimport';


fs.writeFileSync(path.resolve('./package.json'), JSON.stringify(pkg, null, 2), 'utf8');
