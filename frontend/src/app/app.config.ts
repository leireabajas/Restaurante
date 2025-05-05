
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter }    from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { routes }           from './app.routes';
import {AuthInterceptor} from './interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    // 1) Router
    provideRouter(routes),

    // 2) HTTP client con Fetch y recoge interceptores registrados en DI
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),

    // 3) Registrar tu AuthInterceptor en la inyección de HTTP_INTERCEPTORS
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
