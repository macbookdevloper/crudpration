import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
provideHttpClient(withFetch())

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()),provideRouter(routes), provideClientHydration()]
};