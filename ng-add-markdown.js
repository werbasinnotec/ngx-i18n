const fs = require('fs');


const headLine = `
require("webpack");
const marked = require('marked');
const renderer = new marked.Renderer();
`;

const commonCliConfig = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/common.js';
const markdownRule = '{ test: /.md$/, use: [ { loader: "html-loader" }, { loader: "markdown-loader", options: { pedantic: true, renderer }} ] },';

fs.readFile(commonCliConfig, (err, data) => {
  if (err) { throw err; }

  let configText = data.toString();
  // Insert headLine

  configText = configText.replace('require("webpack");', headLine);

  // make sure we don't add the rule if it already exists
  if (configText.indexOf(markdownRule) > -1) { return; }

  // Insert the pug webpack rule
  const position = configText.indexOf('rules: [') + 8;
  const output = [configText.slice(0, position), markdownRule, configText.slice(position)].join('');
  const file = fs.openSync(commonCliConfig, 'r+');
  fs.writeFile(file, output);
  fs.close(file);
});
