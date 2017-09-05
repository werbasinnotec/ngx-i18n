'use strict';

const path = require('path');
const poeditor = require('node-poeditor');
const pkg = require(path.resolve('./package.json'));
const helpers = require('./helpers');
const fs = require('fs');
const http = require('http');

if (!pkg.innotecI18nConfig) {
  console.error('** Error: Moduleconfiguration are missing. Please run innotec-i18n-init');

  process.exit();
}

let appPath = pkg.innotecI18nConfig.appPath;
let fileExt = pkg.innotecI18nConfig.templateExt;
let outPath = pkg.innotecI18nConfig.outPath;

console.log('** Starting Process Import Languages from PO Editor');

(async () => {
  try {
    // Get Project Information
    let res = await poeditor.languages.list(pkg.innotecI18nConfig.poeditor.accesskey, pkg.innotecI18nConfig.poeditor.projectid);

    const indexForEn = res.languages.map((d) => {
      return d.code
    }).indexOf('en');

    if (indexForEn === -1) {
      console.log('** English is Default and not exists in PO Editor. The module create it automatically even if it is without translations');
      await poeditor.languages.add(pkg.innotecI18nConfig.poeditor.accesskey, pkg.innotecI18nConfig.poeditor.projectid, 'en');

      res = await poeditor.languages.list(pkg.innotecI18nConfig.poeditor.accesskey, pkg.innotecI18nConfig.poeditor.projectid);
    }

    let avLangs = [];
    let links = [];

    for (let i = 0; i < res.languages.length; i++) {
      const file = './' + outPath + '/messages.' + res.languages[i].code + '.json';

      avLangs.push({ code: res.languages[i].code, name: res.languages[i].name });

      const link = await poeditor.projects.export(pkg.innotecI18nConfig.poeditor.accesskey, pkg.innotecI18nConfig.poeditor.projectid, { language: res.languages[i].code, tags: pkg.version, type: 'json' });

      helpers.download(link.url, file, (res) => {
        console.log('*** ' + link.url + ' is downloaded sucessfully');
      });
    }

    // Create initfile
      await helpers.createInitFile({
        languages: avLangs,
        path: pkg.innotecI18nConfig.publicPath
      }, outPath);


    // Get Translations

    // Create Files
  } catch (err) {
    console.error('** Error: ' + JSON.stringify(err));
  }
})();
