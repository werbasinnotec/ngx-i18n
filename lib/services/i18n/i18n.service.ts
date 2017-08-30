import { Injectable, Inject } from '@angular/core';
import { LanguageService } from '../language/language.service';

const languagefile = require('./languagefile.json');

declare var window: any;

@Injectable()
export class I18nService {

  constructor(@Inject(LanguageService) public lang: LanguageService) {}

  public getBrowserLang() {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
        return 'en';
    }

    let browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
    browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
    if (browserLang.indexOf('-') !== -1) {
        browserLang = browserLang.split('-')[0];
    }
    if (browserLang.indexOf('_') !== -1) {
        browserLang = browserLang.split('_')[0];
    }
    return browserLang;
  }

  public getLanguage() {
    if (!localStorage.getItem('locale')) {
      return this.lang.getLanguage(this.getBrowserLang()).code;
    }

    return this.lang.getLanguage(localStorage.getItem('locale')).code;
  }

  public set(langcode) {
    localStorage.setItem('locale', this.lang.getLanguage(langcode).code)
  }

  public get(key) {
    let code = this.getLanguage();

    let codeindex = languagefile.map(d => {
        return d.code;
      }).indexOf(code);

    if (codeindex === -1) {
      const mainlng = code.substr(0, 2);

      codeindex = languagefile.map(d => {
        return d.code;
      }).indexOf(mainlng);
    }

    if (codeindex === -1) {
      codeindex = languagefile.map(d => {
        return d.code;
      }).indexOf('en');
    }

    let resolveobj = languagefile[codeindex].values;

    key.split('.').forEach((p) => {
      resolveobj = resolveobj[p];
    });

    return resolveobj;
  }
}
