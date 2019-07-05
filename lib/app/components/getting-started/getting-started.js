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
var index_1 = require("../../../module/index");
var installation = require('../../../../README.md');
var GettingStartedSectionComponent = /** @class */ (function () {
    function GettingStartedSectionComponent(i18n) {
        this.i18n = i18n;
        this.installation = installation;
        this.languages = [];
    }
    GettingStartedSectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.i18n.observeCurrentLanguage().subscribe(function (res) { return _this.langSelector = res; });
        this.i18n.translate('This text is generated over angular backendcode').subscribe(function (res) { return _this.backendProp = res; });
    };
    GettingStartedSectionComponent.prototype.change = function () {
        this.i18n.changeLanguage(this.langSelector);
    };
    GettingStartedSectionComponent = __decorate([
        core_1.Component({
            selector: 'accordion-section',
            template: require('./getting-started.pug')
        }),
        __metadata("design:paramtypes", [index_1.I18n])
    ], GettingStartedSectionComponent);
    return GettingStartedSectionComponent;
}());
exports.GettingStartedSectionComponent = GettingStartedSectionComponent;
//# sourceMappingURL=getting-started.js.map