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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var language_1 = require("./language");
var LanguageService = /** @class */ (function () {
    function LanguageService() {
        this.defaultLank = 'en';
    }
    LanguageService.prototype.getAll = function () {
        return language_1.language;
    };
    LanguageService.prototype.validate = function (code) {
        if (!code) {
            throw new Error('No Languagecode is defined');
        }
        code = code.replace('_', '-');
        var response = false;
        for (var i = 0; i < language_1.language.length; i++) {
            if (language_1.language[i].code.toUpperCase() === code.toUpperCase()) {
                response = true;
            }
        }
        return response;
    };
    LanguageService.prototype.getLanguage = function (code) {
        if (code) {
            code = code.replace('_', '-');
        }
        if (!this.validate(code)) {
            return { code: 'en' };
        }
        for (var i = 0; i < language_1.language.length; i++) {
            if (language_1.language[i].code.toUpperCase() === code.toUpperCase()) {
                return language_1.language[i];
            }
        }
    };
    LanguageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], LanguageService);
    return LanguageService;
}());
exports.LanguageService = LanguageService;
//# sourceMappingURL=language.service.js.map