import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const maxRetries = 2;
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    retry(maxRetries),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.log('Unauthorized access - redirecting to login.');
        router.navigate(['/sign-in']);
        authService.logout();
      }
      console.error('Retry Interceptor Functional Error:', error);
      return throwError(() => error);
    })
  );
};
