import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatToolbarModule } from '@angular/material';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Main Components and Routing for Demopage
import { AppComponent } from './app.component';
import { routing } from './app.routing';

// Import Innotec Modules
import { InnotecI18nServiceModule, I18nPipeModule } from '../module/index';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { GettingStartedSectionComponent } from './components/getting-started/getting-started';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    InnotecI18nServiceModule,
    I18nPipeModule,
    routing,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule
  ],
  declarations: [
    // Main and Template Components
    AppComponent,
    GettingStartedSectionComponent,
    HeaderComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
