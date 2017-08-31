var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from '@angular/core';
import { I18n } from '../../services/i18n/i18n.service';
let NumberPipe = class NumberPipe {
    constructor(i18n) {
        this.i18n = i18n;
    }
    transform(value, args) {
        let languagecode = this.i18n.getCurrentLanguage();
        if (args && args.languagecode) {
            languagecode = args.languagecode;
        }
        if (args && args.style === 'currency') {
            return value.toLocaleString(languagecode, { style: 'currency', currency: args.currency });
        }
        return value.toLocaleString(languagecode);
    }
};
NumberPipe = __decorate([
    Pipe({
        name: 'i18n_number',
        pure: false
    }),
    __metadata("design:paramtypes", [I18n])
], NumberPipe);
export { NumberPipe };
//# sourceMappingURL=number.pipe.js.map