import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

// Services
import { I18n } from './services/i18n/i18n.service';
import { LanguageService } from './services/language/language.service';

export { I18n } from './services/i18n/i18n.service';
export { LanguageService } from './services/language/language.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    I18n,
    LanguageService
  ],
  exports: [
  ]
})

export class InnotecI18nServiceModule {}

export const INNOTEC_I18N_SERVICES: any = [
  I18n,
  LanguageService
]


import { NumberPipe } from './pipes/number/number.pipe';
import { TranslatePipe } from './pipes/translate/translate.pipe';

@NgModule({
    imports: [
    ],

    declarations: [
      TranslatePipe,
      NumberPipe
    ],

    exports: [
      TranslatePipe,
      NumberPipe
    ]
})

export class I18nPipeModule {}
