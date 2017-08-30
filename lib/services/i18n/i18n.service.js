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
const languagefile = require('./languagefile.json');
let I18nService = class I18nService {
    constructor(lang) {
        this.lang = lang;
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
    getLanguage() {
        if (!localStorage.getItem('locale')) {
            return this.lang.getLanguage(this.getBrowserLang()).code;
        }
        return this.lang.getLanguage(localStorage.getItem('locale')).code;
    }
    set(langcode) {
        localStorage.setItem('locale', this.lang.getLanguage(langcode).code);
    }
    get(key) {
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
};
I18nService = __decorate([
    Injectable(),
    __param(0, Inject(LanguageService)),
    __metadata("design:paramtypes", [LanguageService])
], I18nService);
export { I18nService };
//# sourceMappingURL=i18n.service.js.map