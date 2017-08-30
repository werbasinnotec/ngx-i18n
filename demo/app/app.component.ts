import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { INNOTEC_I18N_SERVICES } from '../../index';

@Component({
  selector: 'demo', // <my-app></my-app>
  templateUrl: './app.component.pug',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.sass' ],
  providers: [ INNOTEC_I18N_SERVICES ]
})
export class AppComponent {


  constructor() {
  }

  ngOnInit() {

  }
}
