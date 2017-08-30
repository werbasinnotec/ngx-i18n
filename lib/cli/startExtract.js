'use strict';

const path = require('path');

const helpers = require('./helpers');
const pipeParser = require('./pipe.parser/pipe.parser');

const pkg = require(path.resolve('./package.json'));

if (!pkg.innotecI18nConfig) {
  console.error('** Error: Moduleconfiguration are missing. Please run innotec-i18n-init');

  process.exit();
}

let appPath = pkg.innotecI18nConfig.appPath;
let fileExt = pkg.innotecI18nConfig.templateExt;
let outPath = pkg.innotecI18nConfig.outPath;

process.argv.forEach((val) => {
  if (val.substring(0, 2) === '--') {
    const arg = val.slice(2).split('=');

    switch (arg[0]) {
      case 'templateExt':
        fileExt = arg[1];
      break;

      case 'appPath':
        appPath = arg[1];
      break;

      case 'outPath':
        outPath = arg[1];
      break;

      default:
    }
  }
});

const templateFiles = helpers.findFile(appPath, fileExt);
const angularFiles = helpers.findFile(appPath, 'ts');

console.log('** Name: ' + pkg.name + ' - Extractortool');
console.log('** Process: Start Extract Strings from templates');

(async () => {
  try {
    const obj = [];

    for (let i = 0; i < templateFiles.length; i++) {
      const template = await helpers.readFile(templateFiles[i]);
      const terms = pipeParser(template);

      console.log('** File: ' + templateFiles[i] + ' - Found ' + terms.length + ' keys.');

      for (let j = 0; j < terms.length; j++) {
        const filesplit = templateFiles[i].split('/');

        obj.push({ term: terms[j], context: filesplit[filesplit.length - 1] });
      }
    }

    console.log(obj);
  } catch (err) {
    throw err;
  }

  try {
    await helpers.readFile('test.test');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found!');
    }
  }
})();
