import { inject, TestBed, async, tick } from '@angular/core/testing';
import { LanguageService } from '../language/language.service';
import { I18n } from './i18n.service';
import { HttpModule } from '@angular/http';

describe('I18n Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        I18n, LanguageService
      ]
    });
  });

  it('... I18n.init exists', inject([ I18n ], (i18n) => {
    expect(i18n.init).toBeTruthy();
  }));

  it('... I18n.init execute must set different properties', async(inject([ I18n ], (i18n) => {
    i18n.init('base/demo/public/locale');

    setTimeout(() => {
      expect(i18n.acutalLanguage).toBeDefined();
      expect(i18n.languages.length).toBeGreaterThan(0);
    }, 50)
  })));

  it('... I18n.getBrowserLang exists', inject([ I18n ], (i18n) => {
    expect(i18n.getBrowserLang).toBeTruthy();
  }));

  it('... I18n.getBrowserLang returns the correct language', inject([ I18n ], (i18n) => {
    expect(i18n.getBrowserLang()).toBeDefined();
  }));

  it('... I18n.detectLanguage exists', inject([ I18n ], (i18n) => {
    expect(i18n.detectLanguage).toBeTruthy();
  }));

  it('... I18n.detectLanguage returns the correct language', inject([ I18n ], (i18n) => {
    expect(i18n.detectLanguage()).toBeDefined();
  }));

  it('... I18n.detectLanguage must return the correct languagecode when is defined in localstorage', inject([ I18n ], (i18n) => {
    localStorage.setItem('locale', 'en')

    expect(i18n.detectLanguage()).toBe('en');
  }));

  it('... I18n.mapLanguage exists', inject([ I18n ], (i18n) => {
    expect(i18n.mapLanguage).toBeTruthy();
  }));

  it('... I18n.mapLanguage returns the default when code >en< is not famous', inject([ I18n ], (i18n) => {
    expect(i18n.mapLanguage('it')).toBe('en');
  }));

  it('... I18n.mapLanguage returns the languagecode when the language is famous', async(inject([ I18n ], (i18n) => {
    i18n.init('base/demo/public/locale');

    setTimeout(() => {
      expect(i18n.mapLanguage('de')).toBe('de');
    }, 50);
  })));

  it('... I18n.mapLanguage returns the main languagecode when the sub language is not famous', async(inject([ I18n ], (i18n) => {
    i18n.init('base/demo/public/locale');

    setTimeout(() => {
      expect(i18n.mapLanguage('de-it')).toBe('de');
    }, 50);
  })));

  it('... I18n.getAvaiableLanguages exists', inject([ I18n ], (i18n) => {
    expect(i18n.getAvaiableLanguages).toBeTruthy();
  }));

  it('... I18n.getAvaiableLanguages returns the actual available languages', async(inject([ I18n ], (i18n) => {
    i18n.init('base/demo/public/locale');

    setTimeout(() => {
      expect(i18n.getAvaiableLanguages().length).toBe(2);
    }, 50);
  })));

  it('... I18n.getCurrentLanguage exists', inject([ I18n ], (i18n) => {
    expect(i18n.getAvaiableLanguages).toBeTruthy();
  }));

  it('... I18n.getCurrentLanguage returns the current languages', async(inject([ I18n ], (i18n) => {
    i18n.init('base/demo/public/locale');

    setTimeout(() => {
      expect(i18n.getCurrentLanguage()).toBeDefined();
    }, 50);
  })));

  it('... I18n.getTranslation exists', inject([ I18n ], (i18n) => {
    expect(i18n.getTranslation).toBeTruthy();
  }));

  it('... I18n.getTranslation must response the translation by a term', async(inject([ I18n ], (i18n) => {
    i18n.init('base/demo/public/locale');

    setTimeout(() => {
      expect(i18n.getTranslation('Playground: ')).toBeDefined();
    }, 50);
  })));

  it('... I18n.changeLanguage exists', inject([ I18n ], (i18n) => {
    expect(i18n.changeLanguage).toBeTruthy();
  }));

  it('... I18n.changeLanguage must change the language', async(inject([ I18n ], (i18n) => {
    i18n.init('base/demo/public/locale');

    setTimeout(() => {
      i18n.changeLanguage('de');
    }, 50);

    setTimeout(() => {
      expect(i18n.getTranslation('Playground: ')).toBe('Spielwiese');
    }, 70);
  })));

  it('... I18n.changeLanguage must change the language -- again back to english', async(inject([ I18n ], (i18n) => {
    i18n.init('base/demo/public/locale');

    setTimeout(() => {
      i18n.changeLanguage('en');
    }, 50);

    setTimeout(() => {
      expect(i18n.getTranslation('Playground: ')).toBe('Playground: ');
    }, 70);
  })));

  it('... I18n.changeLanguage must change the language to default en when code is not famous', async(inject([ I18n ], (i18n) => {
    i18n.init('base/demo/public/locale');

    setTimeout(() => {
      i18n.changeLanguage('it');
    }, 50);

    setTimeout(() => {
      expect(i18n.getTranslation('Playground: ')).toBe('Playground: ');
    }, 70);
  })));

  it('... I18n.translate exists', inject([ I18n ], (i18n) => {
    expect(i18n.translate).toBeTruthy();
  }));

  it('... I18n.translate must observe the translation by a term', async(inject([ I18n ], (i18n) => {
    i18n.init('base/demo/public/locale');

    setTimeout(() => {
      i18n.translate('Playground: ').subscribe((d) => {
        expect(d).toBeDefined();
      });
    }, 50);
  })));
});
