'use strict';

const path = require('path');
const poeditor = require('node-poeditor');
const pkg = require(path.resolve('./package.json'));
const helpers = require('./helpers');

if (!pkg.i18nConfig) {
  console.error('** Error: Moduleconfiguration are missing. Please run innotec-i18n-init');

  process.exit();
}

const outPath = pkg.i18nConfig.outPath;

console.log('** Starting Process Import Languages from PO Editor');

(async () => {
  try {
    // Get Project Information
    let res = await poeditor.languages.list(pkg.i18nConfig.poeditor.accesskey, pkg.i18nConfig.poeditor.projectid);

    const indexForEn = res.languages.map((d) => {
      return d.code;
    }).indexOf('en');

    if (indexForEn === -1) {
      console.log('** English is Default and not exists in PO Editor. The module create it automatically even if it is without translations');
      await poeditor.languages.add(pkg.i18nConfig.poeditor.accesskey, pkg.i18nConfig.poeditor.projectid, 'en');

      res = await poeditor.languages.list(pkg.i18nConfig.poeditor.accesskey, pkg.i18nConfig.poeditor.projectid);
    }

    const avLangs = [];

    for (let i = 0; i < res.languages.length; i++) {
      const file = './' + outPath + '/messages.' + res.languages[i].code + '.json';

      avLangs.push({ code: res.languages[i].code, name: res.languages[i].name });

      const link = await poeditor.projects.export(pkg.i18nConfig.poeditor.accesskey, pkg.i18nConfig.poeditor.projectid, { language: res.languages[i].code, tags: pkg.version, type: 'json' });

      helpers.download(link.url, file, () => {
        console.log('*** ' + link.url + ' is downloaded sucessfully');
      });
    }

    // Create initfile
      await helpers.createInitFile({
        languages: avLangs,
        path: pkg.i18nConfig.publicPath
      }, outPath);

    // Create Files
  } catch (err) {
    console.error('** Error: ' + JSON.stringify(err));
  }
})();
