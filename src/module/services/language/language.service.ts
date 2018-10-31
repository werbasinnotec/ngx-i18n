import { Injectable } from '@angular/core';
import { language } from './language';

@Injectable()
export class LanguageService {
  public defaultLank: string = 'en';

  constructor() {}

  public getAll() {
    return language;
  }

  public validate(code) {
    if (!code) {
      throw new Error('No Languagecode is defined');
    }

    code = code.replace('_', '-');

    let response = false;

    for (let i = 0; i < language.length; i++) {
      if (language[i].code.toUpperCase() === code.toUpperCase()) {
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

    for (let i = 0; i < language.length; i++) {
      if (language[i].code.toUpperCase() === code.toUpperCase()) {
        return language[i];
      }
    }
  }
}
