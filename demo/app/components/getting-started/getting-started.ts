import { Component } from '@angular/core';

let installation = require('../../../../README.md');

@Component({
  selector: 'accordion-section',
  template: require('./getting-started.pug')
})

export class GettingStartedSectionComponent {
  public installation: string = installation;
}
