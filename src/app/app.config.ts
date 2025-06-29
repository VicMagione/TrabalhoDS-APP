import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideNgxMask({
      thousandSeparator: '.', // Usa ponto para separar milhares
      decimalMarker: ','      // Usa vírgula como marcador decimal
    }), provideAnimationsAsync()
  ]

  
};

export const appSettings = {
  apiBaseUrl: 'http://localhost:8080'
};
