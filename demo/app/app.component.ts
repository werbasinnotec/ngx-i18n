import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { INNOTEC_I18N_SERVICES, I18n } from '../../index';

@Component({
  selector: 'demo', // <my-app></my-app>
  templateUrl: './app.component.pug',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.sass' ],
  providers: [ INNOTEC_I18N_SERVICES ]
})
export class AppComponent {


  constructor(public i18n: I18n) {
  }

  ngOnInit() {
    this.i18n.init('/locale');
  }
}
