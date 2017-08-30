import { Injectable, Inject } from '@angular/core';
import { LanguageService } from '../language/language.service';
import { Http } from '@angular/Http';

declare var window: any;

@Injectable()
export class I18n {

  public filePath: string;
  public languages: any = [];
  public acutalLanguage: string;
  public languageContent: any = [];

  constructor(@Inject(LanguageService) public lang: LanguageService,
              @Inject(Http) public http: Http) {}

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

  public detectLanguage() {
    if (!localStorage.getItem('locale')) {
      return this.lang.getLanguage(this.getBrowserLang()).code;
    }

    return this.lang.getLanguage(localStorage.getItem('locale')).code;
  }

  public mapLanguage(code) {
    if (this.languages.indexOf(code) !== -1) {
      return code;
    }

    const mainlng = code.substr(0, 2);

    if (this.languages.indexOf(mainlng) !== -1) {
      return mainlng;
    }

    return 'en';
  }

  public loadLanguage(code) {
    this.http.get(this.filePath + `/messages.${this.acutalLanguage}.json`).subscribe(lang => {
      this.languageContent = lang.json();
    });
  }

  public init(path) {
    this.filePath = path;

    this.http.get(this.filePath + '/messages.init.json').subscribe(res => {
      this.languages = res.json().languages;
      this.acutalLanguage = this.mapLanguage(this.detectLanguage());
      this.loadLanguage(this.acutalLanguage);
    });
  }

  public getAvaiableLanguages() {
    return this.languages;
  }

  public getCurrentLanguage() {
    return this.mapLanguage(this.detectLanguage());
  }

  public changeLanguage(code) {
    code = this.lang.getLanguage(code).code;
    this.acutalLanguage = this.mapLanguage(code);
    this.loadLanguage(this.acutalLanguage);

    localStorage.setItem('locale', code);
  }

  public translate(key) {
    const index = this.languageContent.map((d) => {
      return d.term;
    }).indexOf(key);

    if (index !== -1 && this.languageContent[index].definition && this.languageContent[index].definition !== '') {
      return this.languageContent[index].definition;
    }

    return key;
  }
}
