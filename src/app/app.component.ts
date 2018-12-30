import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { I18n } from '../module/index';

@Component({
  selector: 'demo', // <my-app></my-app>
  templateUrl: './app.component.pug',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.sass' ],
  providers: []
})
export class AppComponent {


  constructor(public i18n: I18n) {
  }

  ngOnInit() {
  }
}
