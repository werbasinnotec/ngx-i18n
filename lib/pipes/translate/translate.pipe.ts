import { Pipe, PipeTransform } from '@angular/core';
import { I18n } from '../../services/i18n/i18n.service';

@Pipe({
  name: 'i18n_translate',
  pure: false
})

export class TranslatePipe implements PipeTransform {
  response: any;

  constructor(public i18n: I18n) {}


  transform(value: any, args: string[]): any {
    return this.i18n.getTranslation(value, args);
  }
}
