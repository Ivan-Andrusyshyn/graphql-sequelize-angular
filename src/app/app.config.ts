import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { environment } from './shared/env/env';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { retryInterceptor } from './shared/interceptors/retry.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([retryInterceptor, authInterceptor])),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: environment.apiUrl + '/graphql',
        }),
        cache: new InMemoryCache(),
        ssrMode: false,
      };
    }),
  ],
};
