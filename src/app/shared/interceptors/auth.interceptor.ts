import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const lsService = inject(LocalStorageService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user: User | null = lsService.getItem('user');

  let newReq;
  if (user && user.token) {
    newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return next(newReq);
  } else {
    newReq = req.clone({
      setHeaders: {},
    });
    authService.logout();
    router.navigate(['home']);
    return next(newReq);
  }
};
