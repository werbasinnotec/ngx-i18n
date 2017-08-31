import { Component } from '@angular/core';
import { InnotecI18nServiceModule, I18n } from '../../../../index';

let installation = require('../../../../README.md');

@Component({
  selector: 'accordion-section',
  template: './getting-started.pug'
})

export class GettingStartedSectionComponent {
  public installation: string = installation;
  public languages: any = [];
  public langSelector: any;
  constructor(public i18n: I18n) {}

  ngOnInit() {
    this.langSelector = this.i18n.getCurrentLanguage();
  }

  change() {
    this.i18n.changeLanguage(this.langSelector);
    this.i18n.innotec-i18n-translate('Sau Cool');
    this.i18n.innotec-i18n-translate('Sehr Cool');
  }
}
