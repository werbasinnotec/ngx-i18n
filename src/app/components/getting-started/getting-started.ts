import { Component } from '@angular/core';
import { I18n } from '../../../module/index';

let installation = require('../../../../README.md');

@Component({
  selector: 'accordion-section',
  template: require('./getting-started.pug')
})

export class GettingStartedSectionComponent {
  public installation: string = installation;
  public languages: any = [];
  public langSelector: any;
  public backendProp: string;

  constructor(public i18n: I18n) {}

  ngOnInit() {
    this.i18n.observeCurrentLanguage().subscribe(res => this.langSelector = res);
    this.i18n.translate('This text is generated over angular backendcode').subscribe(res => this.backendProp = res);
  }

  change() {
    this.i18n.changeLanguage(this.langSelector);
  }
}
