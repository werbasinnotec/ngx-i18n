"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var language_service_1 = require("../language/language.service");
describe('LanguageService Service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [],
            providers: [
                language_service_1.LanguageService
            ]
        });
    });
    it('... LanguageService.getLanguage exists', testing_1.inject([language_service_1.LanguageService], function (lang) {
        expect(lang.getLanguage).toBeTruthy();
    }));
    it('... LanguageService.getLanguage must throw an error when no code is defined', testing_1.inject([language_service_1.LanguageService], function (lang) {
        expect(function () {
            lang.getLanguage();
        }).toThrowError('No Languagecode is defined');
    }));
    it('... returns the default languagecode "en" when the called languagecode is not famous', testing_1.inject([language_service_1.LanguageService], function (lang) {
        expect(lang.getLanguage('kl').code).toBe('en');
    }));
    it('... must return the defaultlanguage when the sublanguage is not famous', testing_1.inject([language_service_1.LanguageService], function (lang) {
        expect(lang.getLanguage('de-it').code).toBe('en');
    }));
    it('... must return the correct language from a called language when its famous', testing_1.inject([language_service_1.LanguageService], function (lang) {
        expect(lang.getLanguage('de-de').code).toBe('de-DE');
    }));
    it('... must work with underscore', testing_1.inject([language_service_1.LanguageService], function (lang) {
        expect(lang.getLanguage('de_de').code).toBe('de-DE');
    }));
    it('... must work with all cases', testing_1.inject([language_service_1.LanguageService], function (lang) {
        expect(lang.getLanguage('DE_DE').code).toBe('de-DE');
    }));
    it('... LanguageService.getAll exists', testing_1.inject([language_service_1.LanguageService], function (lang) {
        expect(lang.getAll).toBeTruthy();
    }));
    it('... LanguageService.getAll must return all languages', testing_1.inject([language_service_1.LanguageService], function (lang) {
        expect(lang.getAll().length).toBeGreaterThan(10);
    }));
});
//# sourceMappingURL=language.service.spec.js.map