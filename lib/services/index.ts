import { NgModule } from '@angular/core';


// Services
import { I18nService } from './i18n/i18n.service';
import { LanguageService } from './language/language.service';

@NgModule({
  providers: [
    I18nService,
    LanguageService
  ],
  exports: [
  ]
})

export class InnotecI18nServiceModule {}

export const INNOTEC_I18N_SERVICES: any = [
  I18nService,
  LanguageService
]
