import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'i18n_translate',
  pure: false
})

export class TranslatePipe implements PipeTransform {
  response: any;

  transform(value: any, args: string[]): any {
    return value;
  }
}
