
/**
 * Adds the pug-loader inside Angular CLI's webpack config, if not there yet.
 * @see https://github.com/danguilherme/ng-cli-pug-loader
 */


const fs = require('fs');
const commonCliConfig = 'node_modules/@angular-devkit/build-angular/src/webpack/configs/common.js';
const markdownRule = '{ test: /.md$/, use: [ { loader: "html-loader" }, { loader: "markdown-loader", options: { pedantic: true }} ] },';

fs.readFile(commonCliConfig, (err, data) => {
  if (err) throw err;

  const configText = data.toString();
  // make sure we don't add the rule if it already exists
  if (configText.indexOf(markdownRule) > -1) { return; }

  // Insert the pug webpack rule
  const position = configText.indexOf('rules: [') + 8;
  const output = [configText.slice(0, position), markdownRule, configText.slice(position)].join('');
  const file = fs.openSync(commonCliConfig, 'r+');
  fs.writeFile(file, output, error => {
    if (error)
      console.error("An error occurred while overwriting Angular CLI's Webpack config");

    fs.close(file, () => {});
    console.log('######## Markdown-Loader is installed sucessfully!');
  });
});
