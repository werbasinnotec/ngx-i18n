# @innotec/ngx-i18n - An I18n solution for Angular

This module is an alternative i18n solution for the angular framework. The great advantage of this module is the connectivity to [PO Editor](https://poeditor.com/).

### Installation

```bash
npm i --save --save-exact @innotec/ngx-i18n
```

#### Initialize the module

To initialize this module it's necessary to add some keys in your package.json. Please run follow cli Command:

```bash
./node_modules/.bin/i18n-init
```

This method will add all necessary keys in your package.json without a PO-Editor Configuration. With PO Editor Configuration run the command with follow argument:

```bash
./node_modules/.bin/i18n-init poeditor=true
```

#### Configurate the module

After initialize you will found follow keys in your package.json:

```json
"i18nConfig": {
  "languages": [
    "de",
    "en"
  ],
  "appPath": "src",
  "templateExt": "pug",
  "outPath": "/",
  "publicPath": "/locale",
  "poeditor": {
      "accesskey": "<<ACCESS KEY>>",
      "projectid": 888
    }
}
```

- languages: Configure an array with all languages where you like to support. This key is disabled when module is running with PO-Editor connectivity.
- appPath: Defines the path where your sourecode is reachable. The extractor will run through this folder and extract all keys.
- templateExt: Defines the extension of your templatefiles. Default is `html`. You can change it to `pug`.
- outPath: Configure the path where the extractor will write / update the languagefiles.
- publicPath: Defines the publicPath where the languagesfiles are reachable for angular
- poeditor.accesskey: Defines the access key to the PO Editor API.
- poeditor.projectid: Defines the unique identifier of the project in PO Editor.

#### Implementate in your Angular Application.

You must declare the module in your app.module as first:

```
import { I18nModule } from '@innotec/ngx-i18n';

@NgModule({
  imports: [
    .
    .
    I18nModule
  ],
  .
  .
})
```

Then you must initialize the module on startup your angular project. Here is recommed to use the `APP_INITIALIZER` hook from Angular. You must define it in your `app.module.ts`:

```
import { NgModule, APP_INITIALIZER } from '@angular/core';

.
.
// Initialize i18n
export function init_app(i18n: I18n) {
  return (): Promise<any> => {
    return new Promise((resolve) => {
        (async () => {
          await i18n.init('/assets/locale'); // Describes the path where the messages files are reachable

          resolve();
        })();
    });
  };
}
.
.

@NgModule({
  imports: [
    I18nModule
  ],
  declarations: [
    .
    .
    .

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      multi: true,
      deps: [ I18n ]
    }
  ],
  bootstrap: [ AppComponent ]
})
```



#### Use the Translation Pipe

For Template-Translations this module provides a translation-pipe who's called `i18n_translate`:

```
{{ 'I am a translated text.' | i18n_translate }}
```

Get Plural Text information:

```
{{ 'I am a translated text.' | i18n_translate: 'plural' }}
```

#### i18n Service

The module provides an i18n Service where presents all methods of this module.

Import the class in your application:
```
import { I18n } from '@innotec/ngx-i18n';
```

Avaiabled methods:

- init(path: string): Initialize this module.
- getBrowserLang(): Returns the actual LanguageCode of your Browser.
- getAvaiableLanguages(): Returns the active languages of your application.
- getCurrentLanguage(): Returns the current languagecode.
- observeCurrentLanguage() - Observable: On this function you can observe the current languagecode. If the languagecode in change you can subscribe it. `this.i18n.observeCurrentLanguage().subscribe(res => doAnything())`.
- changeLanguage(code: string): With this function you can change the language with a valid languagecode. If the code not famous in your application the module changes to the default `en`.
- translate(key: string) - Observable: On this function you can get and observe a translation in your angular code. `this.i18n.translate('my famous key').subscribe(res => doAnything())`.

### CLI

#### Extract the Terms from the template.

##### CLI Command:

```bash
npm run i18n-extract
```

If the PO-Editor configuration are active, the module will export all terms to PO Editor automatically.

##### Options

You can call the options via the arguments in the cli. If you are call the command with arguments the configuration from your package.json will overwritten!

Example:

```bash
npm run i18n-extract --templateExt=pug --appPath=demo
```

- templateExt: Defines the extension of your template files. Default is `pug`. ( -- Yes... We love it :-) -- )
- appPath: Defines the path where the extractor search your files. Default is `/`.

#### Translate your languagefile automatically

```bash
npm run i18n-automaticTranslate --languagecode=de
```

##### Options

You must define the languagecode of the file where you want to translate.

- languagecode: Define the languagecode


### Use [POEditor Cloud Service from Code Whale](https://poeditor.com).

The module use the [node-poeditor module](https://www.npmjs.com/package/node-poeditor) to communicate with the POEditor API.

Integration Steps:

1. Create an account on [PO Editor](https://poeditor.com)
2. Create a new project in PO Editor
3. Switch to your account settings in tab API access. Get the API Token and the id from your project on the right side.
4. Change the settings in your package.json

Sync with PO-Editor:

Example:

```bash
npm run i18n-extract
```

With this command the module will sync all your terms with the PO Editor Service. The Version number of your package.json will export as tag. So you can split the translations in your versions.

Now you can add some languages and translate it.

PullDown from PO-Editor:

```bash
npm run i18n-poeditorimport
```

The system will generate your language and initfiles. This command is possible to integrate in your build process.

## License

The MIT License (MIT)
Copyright (c) 2017 - 2019 Werbasinnotec.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
