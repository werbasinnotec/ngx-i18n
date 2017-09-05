'use strict';

const path = require('path');
const poeditor = require('node-poeditor');

const helpers = require('./helpers');
const pipeParser = require('./parsers/pipe.parser');
const funcParser = require('./parsers/func.parser');

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

(async () => {
  try {
    const obj = [];

    console.log('** ---------------------------------------------');
    console.log('** Process: Start Extract Strings from templates');

    for (let i = 0; i < templateFiles.length; i++) {
      const template = await helpers.readFile(templateFiles[i]);
      const terms = pipeParser(template);

      if (terms.length > 0) {
        console.log('** File: ' + templateFiles[i] + ' - Found ' + terms.length + ' keys.');
      }

      for (let j = 0; j < terms.length; j++) {
        const filesplit = templateFiles[i].split('/');

        obj.push({
          term: terms[j],
          definition: '',
          context: pkg.version + ' / ' + '(' + filesplit[filesplit.length - 1] + ')',
          term_plural: '',
          reference: '',
          comment: ''
        });
      }
    }

    console.log('** -----------------------------------------------------');
    console.log('** Process: Start Extract Strings from the Angular Files');

    for (let i = 0; i < angularFiles.length; i++) {
      const fileContent = await helpers.readFile(angularFiles[i]);
      const terms = funcParser(fileContent);

      if (terms.length > 0) {
        console.log('** File: ' + angularFiles[i] + ' - Found ' + terms.length + ' keys.');
      }

      for (let j = 0; j < terms.length; j++) {
        const filesplit = angularFiles[i].split('/');

        obj.push({
          term: terms[j],
          definition: '',
          context: pkg.version + ' / ' + '(' + filesplit[filesplit.length - 1] + ')',
          term_plural: '',
          reference: '',
          comment: ''
        });
      }
    }

    if (pkg.innotecI18nConfig.poeditor) {
      const sync = [];

      const term = await poeditor.terms.list(pkg.innotecI18nConfig.poeditor.accesskey, pkg.innotecI18nConfig.poeditor.projectid);

      for (let i = 0; i < obj.length; i++) {
        let tags = [ pkg.version ];

        const index = term.terms.map((d) => {
          return d.term;
        }).indexOf(obj[i].term);

        if (index !== -1) {
          if (term.terms[index].tags && term.terms[index].tags.length > 0) {
            tags = term.terms[index].tags;
          }

          const tagindex = term.terms[index].tags.map((d) => {
            return d;
          }).indexOf(pkg.version);

          if (tagindex === -1) {
            tags.push(pkg.version);
          }
        }

        sync.push({ term: obj[i].term, context: obj[i].context, tags });
      }

      await poeditor.projects.sync(pkg.innotecI18nConfig.poeditor.accesskey, pkg.innotecI18nConfig.poeditor.projectid, sync);
    } else {
      for (let i = 0; i < pkg.innotecI18nConfig.languages.length; i++) {
        await helpers.createorupdateLangfile(outPath, pkg.innotecI18nConfig.languages[i], obj);
      }

      await helpers.createInitFile({
        languages: pkg.innotecI18nConfig.languages,
        path: pkg.innotecI18nConfig.publicPath
      }, outPath);
    }
  } catch (err) {
    console.log('** Error: ' + JSON.stringify(err));
  }
})();
