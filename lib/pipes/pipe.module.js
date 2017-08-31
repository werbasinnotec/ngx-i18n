var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { NumberPipe } from './number/number.pipe';
import { TranslatePipe } from './translate/translate.pipe';
let I18nPipeModule = class I18nPipeModule {
};
I18nPipeModule = __decorate([
    NgModule({
        imports: [],
        declarations: [
            TranslatePipe,
            NumberPipe
        ],
        exports: [
            TranslatePipe,
            NumberPipe
        ]
    })
], I18nPipeModule);
export { I18nPipeModule };
//# sourceMappingURL=pipe.module.js.map