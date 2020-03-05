import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { I18n } from '../module/index';

@Component({
  selector: 'demo',
  templateUrl: './app.component.pug',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.sass' ]
})
export class AppComponent {


  constructor(public i18n: I18n) {
  }
}
