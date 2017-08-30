'use strict';

const helpers = require('./helpers');
const pipeParser = require('./pipe.parser/pipe.parser');

let path = './';
let fileExt = 'pug';

process.argv.forEach((val) => {
  if (val.substring(0, 2) == '--') {
    const arg = val.slice(2).split('=');

    switch (arg[0]) {
      case 'fileExt':
        fileExt = arg[1];
      break;

      case 'path':
        path = arg[1];
      break;
    }
  }
});

const templateFiles = helpers.findFile(path, fileExt);
const angularFiles = helpers.findFile(path, 'ts');

(async () => {
  try {
    const obj = [];

    for (let i = 0; i < templateFiles.length; i++) {
      const template = await helpers.readFile(templateFiles[i]);
      const terms = pipeParser(template);

      for (let j = 0; j < terms.length; j++) {
        const filesplit = templateFiles[i].split('/');

        obj.push({ term: terms[j], context: filesplit[filesplit.length - 1] });
      }
    }

    console.log(obj);

  } catch (err) {
    throw err;
  }
})();
