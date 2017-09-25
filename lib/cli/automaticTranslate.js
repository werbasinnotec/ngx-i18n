'use strict';

const path = require('path');
const fs = require('fs');
const helpers = require('./helpers');
const translate = require('google-translate-api');
const pkg = require(path.resolve('./package.json'));

if (!pkg.innotecI18nConfig) {
  console.error('** Error: Moduleconfiguration are missing. Please run innotec-i18n-init');

  process.exit();
}

let lang;

process.argv.forEach((val) => {
  if (val.substring(0, 2) === '--') {
    const arg = val.slice(2).split('=');

    switch (arg[0]) {
      case 'languagecode':
        lang = arg[1];
      break;

      default:
      console.log('Not Found');
    }
  }
});

(async () => {
  try {
    const file = './' + pkg.innotecI18nConfig.outPath + '/messages.' + lang + '.json';
    const content = JSON.parse(await helpers.readFile(path.resolve(file)));

    for (let i = 0; i < content.length; i++) {
      if (content[i].definition === '') {
        const trans = await translate(content[i].term, { to: lang });

        console.log('** Translate ' + content[i].term + ' to ' + trans.text);

        content[i].definition = trans.text;
      }
    }

    fs.writeFileSync(file, JSON.stringify(content, null, 2), 'utf8');
    console.log('** Translate process is done');
  } catch (err) {
    throw err;
  }
})();
