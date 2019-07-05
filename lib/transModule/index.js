"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
// Services
var i18n_service_1 = require("./services/i18n/i18n.service");
var language_service_1 = require("./services/language/language.service");
// Pipes
var number_pipe_1 = require("./pipes/number/number.pipe");
var translate_pipe_1 = require("./pipes/translate/translate.pipe");
var I18nModule = /** @class */ (function () {
    function I18nModule() {
    }
    I18nModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpClientModule
            ],
            declarations: [
                translate_pipe_1.TranslatePipe,
                number_pipe_1.NumberPipe
            ],
            providers: [
                i18n_service_1.I18n,
                language_service_1.LanguageService
            ],
            exports: [
                translate_pipe_1.TranslatePipe,
                number_pipe_1.NumberPipe
            ]
        })
    ], I18nModule);
    return I18nModule;
}());
exports.I18nModule = I18nModule;
// Exports
var i18n_service_2 = require("./services/i18n/i18n.service");
exports.I18n = i18n_service_2.I18n;
var language_service_2 = require("./services/language/language.service");
exports.LanguageService = language_service_2.LanguageService;
//# sourceMappingURL=index.js.map