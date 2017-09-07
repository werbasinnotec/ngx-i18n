var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { LanguageService } from '../language/language.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
let I18n = class I18n {
    constructor(lang, http) {
        this.lang = lang;
        this.http = http;
        this.languages = [];
        this.languageContent = [];
        this.changeEvent = new EventEmitter;
    }
    getBrowserLang() {
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
    detectLanguage() {
        if (!localStorage.getItem('locale')) {
            return this.lang.getLanguage(this.getBrowserLang()).code;
        }
        return this.lang.getLanguage(localStorage.getItem('locale')).code;
    }
    mapLanguage(code) {
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
    loadLanguage(code) {
        this.http.get(this.filePath + `/messages.${this.acutalLanguage}.json`).subscribe(lang => {
            this.languageContent = [];
            for (let i in lang.json()) {
                this.languageContent.push(lang.json()[i]);
            }
            this.changeEvent.emit();
        });
    }
    init(path) {
        this.filePath = path;
        this.http.get(this.filePath + '/messages.init.json').subscribe(res => {
            this.languages = res.json().languages;
            this.acutalLanguage = this.mapLanguage(this.detectLanguage());
            this.loadLanguage(this.acutalLanguage);
        });
    }
    getAvaiableLanguages() {
        return this.languages;
    }
    getCurrentLanguage() {
        return this.mapLanguage(this.detectLanguage());
    }
    observeCurrentLanguage() {
        return Observable.create((observer) => {
            let actCode = this.mapLanguage(this.detectLanguage());
            ;
            this.changeEvent.subscribe(() => {
                actCode = this.mapLanguage(this.detectLanguage());
                ;
                return observer.next(actCode);
            });
            return observer.next(actCode);
        });
    }
    changeLanguage(code) {
        code = this.lang.getLanguage(code).code;
        this.acutalLanguage = this.mapLanguage(code);
        this.loadLanguage(this.acutalLanguage);
        localStorage.setItem('locale', code);
    }
    getTranslation(key, args) {
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
    translate(key, args) {
        return Observable.create((observer) => {
            let trans = this.getTranslation(key, args);
            this.changeEvent.subscribe(() => {
                trans = this.getTranslation(key, args);
                return observer.next(trans);
            });
            return observer.next(trans);
        });
    }
};
I18n = __decorate([
    Injectable(),
    __param(0, Inject(LanguageService)),
    __param(1, Inject(Http)),
    __metadata("design:paramtypes", [LanguageService,
        Http])
], I18n);
export { I18n };
//# sourceMappingURL=i18n.service.js.map