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
let TranslatePipe = class TranslatePipe {
    constructor(i18n) {
        this.i18n = i18n;
    }
    transform(value, args) {
        let res = this.i18n.translate(value);
        return res;
    }
};
TranslatePipe = __decorate([
    Pipe({
        name: 'i18n_translate',
        pure: false
    }),
    __metadata("design:paramtypes", [I18n])
], TranslatePipe);
export { TranslatePipe };
//# sourceMappingURL=translate.pipe.js.map