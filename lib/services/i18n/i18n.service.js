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
var I18n = /** @class */ (function () {
    function I18n(lang, http) {
        this.lang = lang;
        this.http = http;
        this.languages = [];
        this.languageContent = [];
        this.changeEvent = new EventEmitter;
    }
    I18n.prototype.getBrowserLang = function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return 'en';
        }
        var browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.split('-')[0];
        }
        if (browserLang.indexOf('_') !== -1) {
            browserLang = browserLang.split('_')[0];
        }
        return browserLang;
    };
    I18n.prototype.detectLanguage = function () {
        if (!localStorage.getItem('locale')) {
            return this.lang.getLanguage(this.getBrowserLang()).code;
        }
        return this.lang.getLanguage(localStorage.getItem('locale')).code;
    };
    I18n.prototype.mapLanguage = function (code) {
        code = code.toLowerCase();
        var index = this.languages.map(function (d) {
            return d.code.toLowerCase();
        }).indexOf(code);
        if (index !== -1) {
            return code;
        }
        var mainlng = code.substr(0, 2);
        var mainindex = this.languages.map(function (d) {
            return d.code;
        }).indexOf(mainlng);
        if (mainindex !== -1) {
            return mainlng;
        }
        return 'en';
    };
    I18n.prototype.loadLanguage = function (code) {
        var _this = this;
        this.http.get(this.filePath + ("/messages." + this.acutalLanguage + ".json")).subscribe(function (lang) {
            _this.languageContent = [];
            for (var i in lang.json()) {
                _this.languageContent.push(lang.json()[i]);
            }
            _this.changeEvent.emit();
        });
    };
    I18n.prototype.init = function (path) {
        var _this = this;
        this.filePath = path;
        this.http.get(this.filePath + '/messages.init.json').subscribe(function (res) {
            _this.languages = res.json().languages;
            _this.acutalLanguage = _this.mapLanguage(_this.detectLanguage());
            _this.loadLanguage(_this.acutalLanguage);
        });
    };
    I18n.prototype.getAvaiableLanguages = function () {
        return this.languages;
    };
    I18n.prototype.getCurrentLanguage = function () {
        return this.mapLanguage(this.detectLanguage());
    };
    I18n.prototype.observeCurrentLanguage = function () {
        var _this = this;
        return Observable.create(function (observer) {
            var actCode = _this.mapLanguage(_this.detectLanguage());
            ;
            _this.changeEvent.subscribe(function () {
                actCode = _this.mapLanguage(_this.detectLanguage());
                ;
                return observer.next(actCode);
            });
            return observer.next(actCode);
        });
    };
    I18n.prototype.changeLanguage = function (code) {
        code = this.lang.getLanguage(code).code;
        this.acutalLanguage = this.mapLanguage(code);
        this.loadLanguage(this.acutalLanguage);
        localStorage.setItem('locale', code);
    };
    I18n.prototype.getTranslation = function (key, args) {
        var index = this.languageContent.map(function (d) {
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
    };
    I18n.prototype.translate = function (key, args) {
        var _this = this;
        return Observable.create(function (observer) {
            var trans = _this.getTranslation(key, args);
            _this.changeEvent.subscribe(function () {
                trans = _this.getTranslation(key, args);
                return observer.next(trans);
            });
            return observer.next(trans);
        });
    };
    I18n = __decorate([
        Injectable(),
        __param(0, Inject(LanguageService)),
        __param(1, Inject(Http)),
        __metadata("design:paramtypes", [LanguageService,
            Http])
    ], I18n);
    return I18n;
}());
export { I18n };
