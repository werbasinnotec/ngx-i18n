# Innotec i18n solution for Angular.io


### Installation

```bash
npm i --save --save-exact @innotec/auth-plugin
```

#### Initialize the module

To initialize this module it's necessary to add some keys in your package.json. Please run follow cli Command:

```bash
./node_modules/.bin/innotec-i18n-init
```

This method will add all necessary keys in your package.json.

#### Configurate the module

After initialize you will found follow keys in your package.json:

```json
"innotecI18nConfig": {
  "poeditor": false,
  "languages": [
    "de",
    "en"
  ],
  "appPath": "src",
  "templateExt": "pug",
  "outPath": "/",
  "publicPath": "/locale"
}
```

- poeditor: Coming soon
- languages: Configure an array with all languages where you like to support
- appPath: Defines the path where your sourecode is reachable. The extractor will run through this folder and extract all keys.
- templateExt: Defines the extension of your templatefiles. Default is `pug`. ( -- Yes... We love it :-) -- )
- outPath: Configure the path where the extractor will write / update the languagefiles.
- publicPath: Defines the publicPath where the languagesfiles are reachable for angular

#### Implementate in your Angular Application.

You must declare the module in your app.module as first:

```
import { InnotecI18nServiceModule } from '@innotec/ngx-i18n';

@NgModule({
  imports: [
    .
    .
    InnotecI18nServiceModule
  ],
  .
  .
})
```

Then you must set the services as providers in your app component:

```
import { INNOTEC_I18N_SERVICES, I18n } from '@innotec/ngx-i18n';


@Component({
  selector: 'app',
  templateUrl: './app.component.pug',
  styleUrls: [
    './themecontrol.sass',
    './app.component.sass'
  ],
  providers: [ CheckAuthStatus, INNOTEC_I18N_SERVICES ],
  encapsulation: ViewEncapsulation.None
})
```

To use this module in your application it's necessary to initialize the module on startup the application. The best place to use this case is the main `app.component`.

Example:

```javascript
import { I18n } from '@innotec/ngx-i18n'; // Import the I18N Service into your application

.
.

export class AppComponent {
  constructor(public i18n: I18n) {
  }

  ngOnInit() {
    this.i18n.init('/locale'); // Initialize the Application and define the path where your initfile are present.
  }
}


```

#### Use the Translation Pipe

For Template-Translations the Module provides a translation-pipe who's called `i18n_translate`. To activate this pipe you must provide the pipemodule from i18n in your app module.

```javascript
import { I18nPipeModule } from '@innotec/ngx-translate';

@NgModule({
  imports: [
    .
    .
    I18nPipeModule
  ],
  .
  .
})
```

So you can call the pipe in your templates:

```
{{ 'I am a translated text.' | i18n_translate }}
```

#### i18n Service

The module provides an i18n Service where presents all methods of this module.

Import the class in your application:
```
import { I18n } from '@innotec/ngx-translate';
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
npm run innotec-i18n-extract
```

##### Options

You can call the options via the arguments in the cli. If you are call the command with arguments the configuration from your package.json is overwritten!

Example:

```bash
npm run innotec-i18n-extract --templateExt=pug --appPath=demo
```

- templateExt: Defines the extension of your template files. Default is `pug`. ( -- Yes... We love it :-) -- )
- appPath: Defines the path where the extractor search your files. Default is `/`.

#### Translate your languagefile automatically

```bash
npm run innotec-i18n-automaticTranslate --languagecode=de
```

##### Options

You must define the languagecode of the file where you want to translate.

- languagecode: Define the languagecode


## License

The MIT License (MIT)
Copyright (c) 2017 Werbasinnotec.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
