"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var language_service_1 = require("../language/language.service");
var i18n_service_1 = require("./i18n.service");
var http_1 = require("@angular/common/http");
describe('I18n Service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule],
            providers: [
                i18n_service_1.I18n, language_service_1.LanguageService
            ]
        });
    });
    it('... I18n.init exists', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.init).toBeTruthy();
    }));
    it('... I18n.init execute must set different properties', testing_1.async(testing_1.inject([i18n_service_1.I18n], function (i18n) {
        i18n.init('base/assets/locale');
        setTimeout(function () {
            expect(i18n.acutalLanguage).toBeDefined();
            expect(i18n.languages.length).toBeGreaterThan(0);
        }, 50);
    })));
    it('... I18n.getBrowserLang exists', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.getBrowserLang).toBeTruthy();
    }));
    it('... I18n.getBrowserLang returns the correct language', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.getBrowserLang()).toBeDefined();
    }));
    it('... I18n.detectLanguage exists', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.detectLanguage).toBeTruthy();
    }));
    it('... I18n.detectLanguage returns the correct language', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.detectLanguage()).toBeDefined();
    }));
    it('... I18n.detectLanguage must return the correct languagecode when is defined in localstorage', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        localStorage.setItem('locale', 'en');
        expect(i18n.detectLanguage()).toBe('en');
    }));
    it('... I18n.mapLanguage exists', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.mapLanguage).toBeTruthy();
    }));
    it('... I18n.mapLanguage returns the default when code >en< is not famous', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.mapLanguage('it')).toBe('en');
    }));
    it('... I18n.mapLanguage returns the languagecode when the language is famous', testing_1.async(testing_1.inject([i18n_service_1.I18n], function (i18n) {
        i18n.init('base/assets/locale');
        setTimeout(function () {
            expect(i18n.mapLanguage('de')).toBe('de');
        }, 50);
    })));
    it('... I18n.mapLanguage returns the main languagecode when the sub language is not famous', testing_1.async(testing_1.inject([i18n_service_1.I18n], function (i18n) {
        i18n.init('base/assets/locale');
        setTimeout(function () {
            expect(i18n.mapLanguage('de-it')).toBe('de');
        }, 50);
    })));
    it('... I18n.getAvaiableLanguages exists', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.getAvaiableLanguages).toBeTruthy();
    }));
    it('... I18n.getAvaiableLanguages returns the actual available languages', testing_1.async(testing_1.inject([i18n_service_1.I18n], function (i18n) {
        i18n.init('base/assets/locale');
        setTimeout(function () {
            expect(i18n.getAvaiableLanguages().length).toBe(2);
        }, 50);
    })));
    it('... I18n.getCurrentLanguage exists', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.getAvaiableLanguages).toBeTruthy();
    }));
    it('... I18n.getCurrentLanguage returns the current languages', testing_1.async(testing_1.inject([i18n_service_1.I18n], function (i18n) {
        i18n.init('base/assets/locale');
        setTimeout(function () {
            expect(i18n.getCurrentLanguage()).toBeDefined();
        }, 50);
    })));
    it('... I18n.getTranslation exists', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.getTranslation).toBeTruthy();
    }));
    it('... I18n.getTranslation must response the translation by a term', testing_1.async(testing_1.inject([i18n_service_1.I18n], function (i18n) {
        i18n.init('base/assets/locale');
        setTimeout(function () {
            expect(i18n.getTranslation('Playground: ')).toBeDefined();
        }, 50);
    })));
    it('... I18n.changeLanguage exists', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.changeLanguage).toBeTruthy();
    }));
    it('... I18n.changeLanguage must change the language', testing_1.async(testing_1.inject([i18n_service_1.I18n], function (i18n) {
        i18n.init('base/assets/locale');
        setTimeout(function () {
            i18n.changeLanguage('de');
        }, 50);
        setTimeout(function () {
            expect(i18n.getTranslation('Playground: ')).toBe('Spielwiese');
        }, 70);
    })));
    it('... I18n.changeLanguage must change the language -- again back to english', testing_1.async(testing_1.inject([i18n_service_1.I18n], function (i18n) {
        i18n.init('base/assets/locale');
        setTimeout(function () {
            i18n.changeLanguage('en');
        }, 50);
        setTimeout(function () {
            expect(i18n.getTranslation('Playground: ')).toBe('Playground: ');
        }, 70);
    })));
    it('... I18n.changeLanguage must change the language to default en when code is not famous', testing_1.async(testing_1.inject([i18n_service_1.I18n], function (i18n) {
        i18n.init('base/assets/locale');
        setTimeout(function () {
            i18n.changeLanguage('it');
        }, 50);
        setTimeout(function () {
            expect(i18n.getTranslation('Playground: ')).toBe('Playground: ');
        }, 70);
    })));
    it('... I18n.translate exists', testing_1.inject([i18n_service_1.I18n], function (i18n) {
        expect(i18n.translate).toBeTruthy();
    }));
    it('... I18n.translate must observe the translation by a term', testing_1.async(testing_1.inject([i18n_service_1.I18n], function (i18n) {
        i18n.init('base/assets/locale');
        setTimeout(function () {
            i18n.translate('Playground: ').subscribe(function (d) {
                expect(d).toBeDefined();
            });
        }, 50);
    })));
});
//# sourceMappingURL=i18n.service.spec.js.map