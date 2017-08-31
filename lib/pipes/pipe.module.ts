import { NgModule } from '@angular/core';
import { NumberPipe } from './number/number.pipe';
import { TranslatePipe } from './translate/translate.pipe';

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
