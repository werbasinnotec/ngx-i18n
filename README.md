# @innotec/ngx-i18n - An I18n solution for Angular projects

This module is an alternative to i18n solution for the angular framework. The great advantage of this module is the connectivity to [PO Editor](https://poeditor.com/) plateforme used to manage the translation inside our projects.

### Installation

To install the module you can run:

```bash
npm i --save @innotec/ngx-i18n
```

#### Initialize the module

The module needs some keys in your **package.json** in order to run. To set the needed keys, please run the following cli Command:

```bash
./node_modules/.bin/i18n-init
```

This last used method will add all necessary keys in your **package.json**, without a PO-Editor configuration. However when you like to use this module with a connectivity to PO Editor, then please run the command with the following argument:

```bash
./node_modules/.bin/i18n-init poeditor=true
```

#### Configurate the module

After initialization some configuration lines inside **package.json** will be added, which contains some keys data to let the translation run correctly:

```json
"i18nConfig": {
  "languages": [
    "de",
    "en"
  ],
  "appPath": "src",
  "templateExt": "html",
  "outPath": "/",
  "publicPath": "/locale",
  "poeditor": {
      "accesskey": "<<ACCESS KEY>>",
      "projectid": 888
    }
}
```

- **languages:** Configures an array with all languages that your application will support. This key is disabled when module is running with PO-Editor connectivity. In this case this configuration will take over the PO Editor.
- **appPath:** Defines the path where your source code is stored in the project. The extractor will navigate through this folders and extract all keys from your templates and typescript files.
- **templateExt:** Defines the extension of your template files. Default is `html`. You can change it to `pug` or other used extensions for preprocessing.
- **outPath:** Configures the path where the extractor will write / update the languagefiles used to switch the text content.
- **publicPath:** Defines the publicPath where the languagesfiles are reachable for angular.
- **poeditor.accesskey:** Defines the access key to the PO Editor API.
- **poeditor.projectid:** Defines the unique identifier of the project on PO Editor plateforme.

**/!\ Note:**

- The `version` key in your **package.json** is a main parameter for this module. Its value once exported to **po-editor** makes it possible for us to manage the application's versions on po-editor, too.
- Please be sure that the folders' path you are allocating to the parameters **appPath**, **outPath** or **publicPath** are existing. If the mentioned folders inside the path are not created then the translation system will broke supposing that the folders were already existing  

#### Implementation in your Angular Application.

You must declare the `i18nModule` module in your **app.module** as a first step inside the main angular components:

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

Then you must initialize the module during the startup/Bootstrap of your angular application. Here is recommeded to use the `APP_INITIALIZER` hook from Angular. You must define it in your `app.module.ts` first and import the service `I18n` with it too:

```
import { NgModule, APP_INITIALIZER, I18n } from '@angular/core';

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

With this configuration it's possible to load the language files on the startup of your project. Which make all languages content avaiable later once the application is loaded.

#### Use the Translation Pipe

For **Template-Translations** this module provides a translation-pipe who's called `i18n_translate`:

```
{{ 'I am a translated text.' | i18n_translate }}
```

Get Plural Text information:

```
{{ 'I am a translated text.' | i18n_translate: 'plural' }}
```

#### i18n Service

The module provides an `i18n` Service which gives access to all methods of this module.

Import the class in your application:
```
import { **I18n** } from '@innotec/ngx-i18n';
```

Avaiabled methods:

- **init(path: string):** Initialize this module.
- **getBrowserLang():** Returns the actual `LanguageCode` of your Browser.
- **getAvaiableLanguages():** Returns the active languages of your application.
- **getCurrentLanguage():** Returns the current `languagecode`.
- **observeCurrentLanguage() - Observable:** On this function you can observe realtime changes of languagecode. If the `languagecode` will change then you can trigger some actions once subscribed to it. `this.i18n.observeCurrentLanguage().subscribe(res => doAnything())`.
- **changeLanguage(code: string):** Via this function you can switch the language using a valid languagecode. If the code is undefined in your application then the module will switch the `languagecode` to the default value which means `en`.
- **translate(key: string) - Observable:** this function makes it possible to get and observe a translation in your angular code. `this.i18n.translate('my famous key').subscribe(res => doAnything())`.

### CLI

#### Extract the Terms from the template.

##### CLI Command:

```bash
npm run i18n-extract
```

If the PO-Editor configuration is active, the module will export all terms to PO Editor automatically.

##### Options

You can call the options via the arguments in the cli. If you are using the command with arguments, the configuration from your **package.json** will be overwritten!

###### Example:

```bash
npm run i18n-extract --templateExt=pug --appPath=demo
```

- **templateExt:** Defines the extension of your template files. Default is `html`.
- **appPath:** Defines the path where the extractor search for your files. Default is `/`.

#### Translate your languagefile automatically

```bash
npm run i18n-automaticTranslate --languagecode=de
```

With this command the module will call the **google-translate-api**. On startingup using this command the module will loop over your **language-file** and will translate all terms over google translate.

##### Options

The code value is used to define the language of the translation.

- **languagecode:** Define the languagecode


### Use [POEditor Cloud Service from Code Whale](https://poeditor.com).

The module uses the [node-poeditor module](https://www.npmjs.com/package/node-poeditor) to communicate with the POEditor API.

Integration Steps:

1. Create an account on [PO Editor](https://poeditor.com)
2. Create a new project in PO Editor once authenticated
3. Switch to your account settings in tab API access. Get the **API Token** and the **id** from the related project.
4. Change the settings in your package.json

Sync with PO-Editor:

#### Example:

```bash
npm run i18n-extract
```

With this command the module will sync all your terms with the PO Editor Service. The **Version number** of your package.json will be exported as a tag. So you can split the translations in different versions.

Now you can add some languages and translate them.

PullDown from PO-Editor:

```bash
npm run i18n-poeditorimport
```

The system will `generate` your different languages files in addition to the initialization file inside the mentioned **outpath**. This command is possible to integrate in your build process.

## License

The MIT License (MIT)
Copyright (c) 2017 - 2019 Werbas Innotec GmbH.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
