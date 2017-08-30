import { NgModule } from '@angular/core';
import { TranslatePipe } from './translate/translate.pipe';

@NgModule({
    imports: [
    ],

    declarations: [
      TranslatePipe
    ],

    exports: [
      TranslatePipe
    ]
})

export class I18nPipeModule {}
