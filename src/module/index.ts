import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Services
import { I18n } from './services/i18n/i18n.service';
import { LanguageService } from './services/language/language.service';

// Pipes
import { NumberPipe } from './pipes/number/number.pipe';
import { TranslatePipe } from './pipes/translate/translate.pipe';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    TranslatePipe,
    NumberPipe
  ],
  providers: [
    I18n,
    LanguageService
  ],
  exports: [
    TranslatePipe,
    NumberPipe
  ]
})

export class I18nModule {
}

// Exports
export { I18n } from './services/i18n/i18n.service';
export { LanguageService } from './services/language/language.service';
