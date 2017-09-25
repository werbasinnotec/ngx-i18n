import { inject, TestBed } from '@angular/core/testing';
import { LanguageService } from '../language/language.service';

describe('LanguageService Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      providers: [
        LanguageService
      ]
    });
  });

  it('... LanguageService.getLanguage exists', inject([ LanguageService ], (lang) => {
    expect(lang.getLanguage).toBeTruthy();
  }));

  it('... LanguageService.getLanguage must throw an error when no code is defined', inject([ LanguageService ], (lang) => {
    expect(() => {
      lang.getLanguage();
    }).toThrowError('No Languagecode is defined');
  }));

  it('... returns the default languagecode "en" when the called languagecode is not famous', inject([ LanguageService ], (lang) => {
    expect(lang.getLanguage('kl').code).toBe('en');
  }));

  it('... must return the defaultlanguage when the sublanguage is not famous', inject([ LanguageService ], (lang) => {
    expect(lang.getLanguage('de-it').code).toBe('en');
  }));

  it('... must return the correct language from a called language when its famous', inject([ LanguageService ], (lang) => {
    expect(lang.getLanguage('de-de').code).toBe('de-DE');
  }));

  it('... must work with underscore', inject([ LanguageService ], (lang) => {
    expect(lang.getLanguage('de_de').code).toBe('de-DE');
  }));

  it('... must work with all cases', inject([ LanguageService ], (lang) => {
    expect(lang.getLanguage('DE_DE').code).toBe('de-DE');
  }));
});
