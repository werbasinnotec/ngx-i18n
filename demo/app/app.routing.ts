import { RouterModule, Routes } from '@angular/router';

import { GettingStartedSectionComponent } from './components/getting-started/getting-started';

export const routes: Routes = [
  {
    path: '',
    data: ['Getting Started'],
    component: GettingStartedSectionComponent
  }
];

export const routing = RouterModule.forRoot(routes);
