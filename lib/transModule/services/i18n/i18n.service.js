"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var language_service_1 = require("../language/language.service");
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var I18n = /** @class */ (function () {
    function I18n(lang, http) {
        this.lang = lang;
        this.http = http;
        this.languages = [];
        this.languageContent = [];
        this.changeEvent = new core_1.EventEmitter;
    }
    I18n.prototype.getBrowserLang = function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return 'en';
        }
        var browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.replace('_', '-');
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
            for (var i in lang) {
                _this.languageContent.push(lang[i]);
            }
            _this.changeEvent.emit();
        });
    };
    I18n.prototype.init = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.filePath = path;
                this.http.get(this.filePath + '/messages.init.json').subscribe(function (res) {
                    _this.languages = res.languages;
                    _this.acutalLanguage = _this.mapLanguage(_this.detectLanguage());
                    _this.loadLanguage(_this.acutalLanguage);
                    return;
                });
                return [2 /*return*/];
            });
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
        return Observable_1.Observable.create(function (observer) {
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
        return Observable_1.Observable.create(function (observer) {
            var trans = _this.getTranslation(key, args);
            _this.changeEvent.subscribe(function () {
                trans = _this.getTranslation(key, args);
                return observer.next(trans);
            });
            return observer.next(trans);
        });
    };
    I18n = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(language_service_1.LanguageService)),
        __param(1, core_1.Inject(http_1.HttpClient)),
        __metadata("design:paramtypes", [language_service_1.LanguageService,
            http_1.HttpClient])
    ], I18n);
    return I18n;
}());
exports.I18n = I18n;
//# sourceMappingURL=i18n.service.js.map