import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'top-header',
  template: require('./header.component.pug'),
  styles: [ require('./header.component.sass') ]
})

export class HeaderComponent {

  constructor() {

  }
}
