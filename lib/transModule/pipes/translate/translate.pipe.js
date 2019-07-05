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
var i18n_service_1 = require("../../services/i18n/i18n.service");
var TranslatePipe = /** @class */ (function () {
    function TranslatePipe(i18n) {
        this.i18n = i18n;
    }
    TranslatePipe.prototype.transform = function (value, args) {
        return this.i18n.getTranslation(value, args);
    };
    TranslatePipe = __decorate([
        core_1.Pipe({
            name: 'i18n_translate',
            pure: false
        }),
        __metadata("design:paramtypes", [i18n_service_1.I18n])
    ], TranslatePipe);
    return TranslatePipe;
}());
exports.TranslatePipe = TranslatePipe;
//# sourceMappingURL=translate.pipe.js.map