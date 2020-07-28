import { Pipe, PipeTransform } from '@angular/core';
import { I18n } from '../../services/i18n/i18n.service';

@Pipe({
  name: 'i18n_number',
  pure: true
})

export class NumberPipe implements PipeTransform {
  response: any;

  constructor(public i18n: I18n) {}

  transform(value: any, args): any {
    let languagecode = this.i18n.getCurrentLanguage();

    if (args && args.languagecode) {
      languagecode = args.languagecode;
    }

    if (args && args.style === 'currency') {
      return value.toLocaleString(languagecode, { style: 'currency', currency: args.currency });
    }

    return value.toLocaleString(languagecode);
  }
}
