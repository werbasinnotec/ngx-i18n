'use strict';

const fs = require('fs');
const path = require('path');
const pkg = require(path.resolve('./package.json'));
const args = process.argv;

let poeditor;

console.log('*** Writing moduleconfiguration to package.json ');

if (args.map(d => d).indexOf('poeditor=true') !== -1) {
  poeditor = true;
  console.log('*** with configuration to connect PO-Editor');
}

// Define defaultconfig in package.json.
pkg.i18nConfig = {
  languages: [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' }
  ],
  appPath: 'src',
  templateExt: 'html',
  outPath: '/',
  publicPath: '/locale'
};

if (poeditor) {
  pkg.i18nConfig.poeditor = {
    accesskey: "<<ACCESSKEY>>",
    projectid: 8888
  }
}

if (!pkg.scripts) {
  pkg.scripts = {};
}

pkg.scripts['i18n-extract'] = './node_modules/.bin/i18n-extract';
pkg.scripts['i18n-automaticTranslate'] = './node_modules/.bin/i18n-automaticTranslate';
pkg.scripts['i18n-poeditorimport'] = './node_modules/.bin/i18n-poeditorimport';

fs.writeFileSync(path.resolve('./package.json'), JSON.stringify(pkg, null, 2), 'utf8');
