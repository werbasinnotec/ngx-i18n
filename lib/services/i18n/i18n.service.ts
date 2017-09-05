import { Injectable, Inject, EventEmitter } from '@angular/core';
import { LanguageService } from '../language/language.service';
import { Http } from '@angular/Http';

import { Observable } from 'rxjs/Observable';
import { Observer } from "rxjs/Observer";
import 'rxjs/add/operator/map';

declare var window: any;

@Injectable()
export class I18n {

  public filePath: string;
  public languages: any = [];
  public acutalLanguage: string;
  public languageContent: any = [];
  public changeEvent: any = new EventEmitter;

  constructor(@Inject(LanguageService) public lang: LanguageService,
              @Inject(Http) public http: Http) {
              }

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
    const index = this.languages.map(d => {
      return d.code;
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
    this.http.get(this.filePath + `/messages.${this.acutalLanguage}.json`).subscribe(lang => {
      this.languageContent = [];

      for (let i in lang.json()) {
        this.languageContent.push(lang.json()[i]);
      }

      this.changeEvent.emit();
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

  public observeCurrentLanguage(): Observable<string | any> {
    return Observable.create((observer: Observer<string>) => {
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
    return Observable.create((observer: Observer<string>) => {
      let trans = this.getTranslation(key, args);

      this.changeEvent.subscribe(() => {
        trans = this.getTranslation(key, args);

        return observer.next(trans);
      });

      return observer.next(trans);
    });
  }
}
