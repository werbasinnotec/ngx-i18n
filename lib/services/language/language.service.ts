import { Injectable } from '@angular/core';

const lang = require('./language.json');

@Injectable()
export class LanguageService {
  public defaultLank: string = 'en';

  constructor() {}

  public validate(code) {
    if (!code) {
      throw new Error('No Languagecode is defined');
    }

    code = code.replace('_', '-');

    let response = false;

    for (let i = 0; i < lang.length; i++) {
      if (lang[i].code.toUpperCase() === code.toUpperCase()) {
        response = true;
      }
    }

    return response;
  }

  public getLanguage(code) {
    if (code) {
      code = code.replace('_', '-');
    }

    if (!this.validate(code)) {
      return { code: 'en' };
    }

    for (let i = 0; i < lang.length; i++) {
      if (lang[i].code.toUpperCase() === code.toUpperCase()) {
        return lang[i];
      }
    }
  }
}
