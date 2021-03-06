import { Injectable, Inject, EventEmitter } from '@angular/core';
import { LanguageService } from '../language/language.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

declare var window: any;

@Injectable()
export class I18n {

  public filePath: string;
  public languages: any = [];
  public acutalLanguage: string;
  public languageContent: any = [];
  public changeEvent: any = new EventEmitter;

  constructor(@Inject(LanguageService) public lang: LanguageService,
              @Inject(HttpClient) public http: HttpClient) {
              }

  public getBrowserLang() {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
        return 'en';
    }

    let browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
    browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;

    if (browserLang.indexOf('-') !== -1) {
        browserLang = browserLang.replace('_', '-');
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
    code = code.toLowerCase();

    const index = this.languages.map(d => {
      return d.code.toLowerCase();
    }).indexOf(code);

    if (index !== -1) {
      return code;
    }

    const mainlng = code.substr(0, 2);
    const mainindex = this.languages.map(d => {
      return d.code;
    }).indexOf(mainlng);

    if (mainindex !== -1) {
      return mainlng;
    }

    return 'en';
  }

  public loadLanguage(code) {
    this.http.get(this.filePath + `/messages.${this.acutalLanguage}.json`).subscribe((lang: any) => {
      this.languageContent = [];

      for (let i in lang) {
        this.languageContent.push(lang[i]);
      }

      this.changeEvent.emit();
    });
  }

  async init(path): Promise<void>  {
    this.filePath = path;

    this.http.get(this.filePath + '/messages.init.json').subscribe((res: any) => {
      this.languages = res.languages;

      this.acutalLanguage = this.mapLanguage(this.detectLanguage());
      this.loadLanguage(this.acutalLanguage);

      document.documentElement.lang = this.acutalLanguage;
      return
    });
  }

  public getAvaiableLanguages() {
    return this.languages;
  }

  public getCurrentLanguage() {
    return this.mapLanguage(this.detectLanguage());
  }

  public observeCurrentLanguage(): Observable<string | any> {
    return new Observable((observer) => {
      let actCode = this.mapLanguage(this.detectLanguage());;

      this.changeEvent.subscribe(() => {
        actCode = this.mapLanguage(this.detectLanguage());;

        return observer.next(actCode);
      });

      return observer.next(actCode);
    });
  }

  public changeLanguage(code) {
    code = this.lang.getLanguage(code).code;
    this.acutalLanguage = this.mapLanguage(code);
    this.loadLanguage(this.acutalLanguage);
    document.documentElement.lang = code;
    localStorage.setItem('locale', code);
  }

  public getTranslation(key, args?) {
    const index = this.languageContent.map((d) => {
      return d.term;
    }).indexOf(key);

    if (index !== -1 && this.languageContent[index].definition && this.languageContent[index].definition !== '') {
      if (args === 'plural' && this.languageContent[index].definition.other) {
        return this.languageContent[index].definition.other;
      }

      if (args === 'plural' && this.languageContent[index].definition.one) {
        return this.languageContent[index].definition.one;
      }

      if (this.languageContent[index].definition.one) {
        return this.languageContent[index].definition.one;
      }

      return this.languageContent[index].definition;
    }

    return key;
  }

  public translate(key, args?): Observable<string | any> {
    return new Observable((observer) => {
      let trans = this.getTranslation(key, args);

      this.changeEvent.subscribe(() => {
        trans = this.getTranslation(key, args);

        return observer.next(trans);
      });

      return observer.next(trans);
    });
  }
}
