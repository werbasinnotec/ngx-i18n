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

### CLI

#### Extract the Terms from the template.

##### CLI Command:

```bash
./node_modules/.bin/innotec-i18n-extract
```

##### Options

You can call the options via the arguments in the cli. If you are call the command with arguments the configuration from your package.json is overwritten!

Example:

```bash
./node_modules/.bin/innotec-i18n-extract --templateExt=pug --appPath=demo
```

- templateExt: Defines the extension of your template files. Default is `pug`. ( -- Yes... We love it :-) -- )
- appPath: Defines the path where the extractor search your files. Default is `/`.



(C) 2017 - Werbas AG / Werbas Innotec GmbH
All rights reserverd!









-
