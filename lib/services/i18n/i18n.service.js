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
import { Injectable, Inject } from '@angular/core';
import { LanguageService } from '../language/language.service';
import { Http } from '@angular/Http';
let I18n = class I18n {
    constructor(lang, http) {
        this.lang = lang;
        this.http = http;
        this.languages = [];
        this.languageContent = [];
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
        if (this.languages.indexOf(code) !== -1) {
            return code;
        }
        const mainlng = code.substr(0, 2);
        if (this.languages.indexOf(mainlng) !== -1) {
            return mainlng;
        }
        return 'en';
    }
    loadLanguage(code) {
        this.http.get(this.filePath + `/messages.${this.acutalLanguage}.json`).subscribe(lang => {
            this.languageContent = lang.json();
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
    changeLanguage(code) {
        code = this.lang.getLanguage(code).code;
        this.acutalLanguage = this.mapLanguage(code);
        this.loadLanguage(this.acutalLanguage);
        localStorage.setItem('locale', code);
    }
    translate(key) {
        const index = this.languageContent.map((d) => {
            return d.term;
        }).indexOf(key);
        if (index !== -1 && this.languageContent[index].definition && this.languageContent[index].definition !== '') {
            return this.languageContent[index].definition;
        }
        return key;
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