import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Main Components and Routing for Demopage
import { AppComponent } from './app.component';
import { routing } from './app.routing';

// Import Innotec Modules
import { I18nModule, I18n } from '../module/index';

import { GettingStartedSectionComponent } from './components/getting-started/getting-started';
import { HeaderComponent } from './components/header/header.component';

// Application Initializor
export function init_app(i18n: I18n) {
  return (): Promise<any> => {
    return new Promise((resolve) => {
        (async () => {
          await i18n.init('/assets/locale');

          resolve();
        })();
    });
  };
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    I18nModule,
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
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      multi: true,
      deps: [ I18n ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
