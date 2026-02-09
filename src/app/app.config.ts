import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppEffects } from './store/app/app.effects';
import { ApiEffects } from './store/api/api.effects';
import { API_FEATURE_KEY, apiReducer, APP_FEATURE_KEY, appReducer } from './store';
import { authInterceptor } from './shared/services/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions(), withRouterConfig({
      onSameUrlNavigation: 'reload',
    })),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor])),
    // NgRx global registration
    provideStore({
      [APP_FEATURE_KEY]: appReducer,
      [API_FEATURE_KEY]: apiReducer,
    }),
    provideEffects([AppEffects, ApiEffects]),
    provideStoreDevtools({ maxAge: 25, name: 'BOILERPLATE Store' }),
  ]
};
