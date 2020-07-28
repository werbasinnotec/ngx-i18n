import { Pipe, PipeTransform } from '@angular/core';
import { parseISO, formatRelative  } from 'date-fns';
import { de, enGB, it, es, fr } from 'date-fns/locale';

/* tslint:disable */
@Pipe({
  name: 'toLocaleTime',
  pure: true
})

export class ToLocaleTime implements PipeTransform {

  constructor() {}

  private getLocale() {
    const lang = document.documentElement.lang.substr(0, 2);

    switch (lang.toLowerCase()) {
      case 'en': return enGB;
      case 'de': return de;
      case 'es': return es;
      case 'it': return it;
      case 'fr': return fr;

      default:
        return enGB;
    }
  }

  transform(value: any, args?: string) {
    console.log()

    return formatRelative(new Date(), parseISO(value), { locale: this.getLocale() })
  }
}
/* tslint:enable */
